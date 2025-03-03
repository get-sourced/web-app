import type { Socket } from "socket.io-client";
import {
  getRandomName,
  updateFilesArray,
  updateReceivedMessageArray,
} from "./utils";
import type { stateType } from "./types";
import { toast } from "@/components/Toaster/Toast";

export class Initialize {
  private readonly _socket: Socket;
  private readonly _setState: stateType["setState"];
  private _fileHandle: FileSystemHandle | undefined = undefined;
  private _writable: FileSystemWritableFileStream | undefined = undefined;
  private _receivedBytes = 0;
  private _sender: FileType | undefined = undefined;
  private readonly MAX_SIZE_FOR_MEMORY = 15 * 1024 * 1024;
  private _chunks: BlobPart[] = []; // Fallback for unsupported browsers
  constructor(socket: Socket, setState: stateType["setState"]) {
    this._socket = socket;
    this._setState = setState;
  }

  // Get the socket ID of the current user
  onConnect() {
    this._socket.on("connect", () => {
      const userAgent = navigator.userAgent;
      const fullName = getRandomName();
      this._setState((prev) => ({
        ...prev,
        currentUser: { id: this._socket.id as string, name: fullName },
      }));
      this._socket.emit("userDetails", { userAgent, fullName });
      toast.success("You are on the radar!");
    });
  }

  // Receive the list of all connected users
  getUsers() {
    this._socket.on("users", (usersList: User[]) => {
      const users_ = usersList.filter((user) => user.id !== this._socket.id);
      this._setState((prev) => ({ ...prev, users: users_ }));
    });
  }

  // Get the sender, file name, and size if it is the receiver
  onGetSender() {
    this._socket.on("sender", (data) => {
      this._sender = data;
      toast(`You got a file request from ${data.sender.fullName}`);
      this._setState((prev) => ({
        ...prev,
        senderUser: data,
        initial: false,
        receivedFileArray: updateFilesArray(
          prev.receivedFileArray,
          data
        ) as FileType[],
      }));
    });
  }

  // Get the progress percent for showing it on the receiver side
  onProgress() {
    this._socket.on("progressPer", ({ progressPer }) => {
      // Handle file transfer progress and state resets
      if (Number(progressPer.toFixed(0)) >= 100) {
        this._setState((prev) => ({
          ...prev,
          progress: 0,
          senderUser: null,
          selectedUser: null,
        }));
      } else {
        this._setState((prev) => ({ ...prev, progress: progressPer }));
      }
    });
  }

  // Get the response if the sender can initiate the file transfer
  onFileResponse() {
    this._socket.on("fileTransfer", ({ acceptFile, sender }) => {
      if (acceptFile) {
        toast(`File request to ${sender.fullName} was accepted`);
      } else {
        toast.error(`File request to ${sender.fullName} was denied!`);
      }
      this._setState((prev) => ({ ...prev, isFileAccepted: acceptFile }));
    });
  }

  // Get the message if it is the receiver
  onMessage() {
    this._socket.on(
      "receiveMessage",
      ({ msg, sender }: { msg: string; sender: User }) => {
        if ("Notification" in window) {
          if (
            Notification.permission === "granted" &&
            window.localStorage.getItem("notification")
          ) {
            new Notification(`You got message from ${sender.fullName}`, {
              body: msg,
            });
          } else {
            toast(
              `You got message from ${sender.fullName}. Enable notification to see!`
            );
          }
        } else {
          toast(
            `You got message from ${sender.fullName}. To see notification switch to desktop`
          );
        }
        this._setState((prev) => ({
          ...prev,
          receivedMessageArray: updateReceivedMessageArray(
            prev.receivedMessageArray,
            msg,
            sender
          ),
        }));
      }
    );
  }

  // Listen for the file being sent to this user
  onReceiveFile() {
    this._socket.on("receiveFile", ({ fileName, fileType, fileData }) => {
      // Create a Blob from the file data
      const blob = new Blob([new Uint8Array(fileData)], { type: fileType });
      // Create a download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      // Cleanup the object URL
      URL.revokeObjectURL(url);
      toast(`${fileName} received successfully`);
    });
  }

  onReceiveChunks() {
    this._socket.on(
      "receiveChunk",
      async ({ fileData, chunkNumber, totalChunks }) => {
        if (!this._sender) return;
        const condition = this._sender.size > this.MAX_SIZE_FOR_MEMORY;
        // await this.checkIfCanWriteToFile();
        if (this._writable) {
          // Write chunk directly to disk
          try {
            await this._writable.write(new Uint8Array(fileData));
            this._receivedBytes += fileData.byteLength;
            const progress = Math.round(
              (this._receivedBytes / totalChunks) * 100
            );
            this._socket.emit("progress", {
              progressPer: progress,
              targetUser: this._sender?.sender,
            });
          } catch {
            this._socket.emit("reject-transfer", {
              id: this._sender?.sender.id,
            });
          }
        } else if (!condition) {
          this._chunks.push(fileData);
          const progress = Math.round((chunkNumber / totalChunks) * 100);
          this._socket.emit("progress", {
            progressPer: progress,
            targetUser: this._sender?.sender,
          });
        }
      }
    );
  }

  onRejectTransfer() {
    if (this._writable) {
      this._writable.abort();
    }
    this._socket.on("transfer-interrupted", (user: FileType) => {
      toast.error(
        `File to ${user.sender.fullName} was rejected because of size. For larger files kindly use supported browser`
      );
    });
  }
  async onReceiveComplete() {
    this._socket.on("transfer-complete", async () => {
      if (this._writable) {
        console.log("this._writable completed");
        await this._writable.close();
      } else {
        // Fallback: Create Blob and trigger download
        const blob = new Blob(this._chunks);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = this._sender?.name as string;
        a.click();
        URL.revokeObjectURL(url);
        this._chunks = [];
      }
      toast(`${this._sender?.name} received successfully`);
    });
  }

  async checkIfCanWriteToFile() {
    const condition = (this._sender?.size as number) > 1 * 1024 * 1024;
    if ("showSaveFilePicker" in window) {
      try {
        this._fileHandle = await window.showSaveFilePicker({
          suggestedName: this._sender?.name,
        });
        if (this._fileHandle && "createWritable" in this._fileHandle) {
          this._writable = await (
            this._fileHandle as FileSystemFileHandle
          ).createWritable();
        }
      } catch (err) {
        console.log("Error", err);
        this._socket.emit("reject-transfer", { id: this._sender?.sender.id });
      }
    } else if (condition) {
      this._socket.emit("reject-transfer", { id: this._sender?.sender.id });
      toast.error("File is bigger use supported browser for transfer");
    }
  }

  clearSockets() {
    this._socket.off("connect");
    this._socket.off("users");
    this._socket.off("senderId");
    this._socket.off("progressPer");
    this._socket.off("fileTransfer");
    this._socket.off("receiveMessage");
    this._socket.off("receiveFile");
    this._socket.off("transfer-complete");
    this._socket.off("transfer-interrupted");
    this._socket.off("receiveChunk");
  }
}
