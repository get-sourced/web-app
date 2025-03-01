/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import type { Socket } from "socket.io-client";
import {
  getRandomName,
  updateFilesArray,
  updateReceivedMessageArray,
} from "../lib/utils";
import { useGlobalState } from "../context/useStateContext";
import { toast } from "@/components/Toaster/Toast";
function useInitializer(socket: Socket) {
  const { setState, setIsNotificationEnabled } = useGlobalState();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // Register socket event handlers
    const setupSocketHandlers = () => {
      // Get the socket ID of the current user
      socket.on("connect", () => {
        const userAgent = navigator.userAgent;
        const fullName = getRandomName();
        setState((prev) => ({
          ...prev,
          currentUser: { id: socket.id as string, name: fullName },
        }));
        socket.emit("userDetails", { userAgent, fullName });
        toast.success("You are on the radar!");
      });

      // Receive the list of all connected users
      socket.on("users", (usersList: User[]) => {
        const users_ = usersList.filter((user) => user.id !== socket.id);
        setState((prev) => ({ ...prev, users: users_ }));
      });

      // Get the sender, file name, and size if it is the receiver
      socket.on("sender", (data) => {
        toast(`You got a file request from ${data.sender.fullName}`);
        setState((prev) => ({
          ...prev,
          senderUser: data,
          initial: false,
          receivedFileArray: updateFilesArray(
            prev.receivedFileArray,
            data
          ) as FileType[],
        }));
      });

      // Get the progress percent for showing it on the receiver side
      socket.on("progressPer", ({ progressPer }) => {
        // Handle file transfer progress and state resets
        if (Number(progressPer.toFixed(0)) >= 100) {
          setState((prev) => ({
            ...prev,
            progress: 0,
            senderUser: null,
            selectedUser: null,
          }));
        } else {
          setState((prev) => ({ ...prev, progress: progressPer }));
        }
      });

      // Get the response if the sender can initiate the file transfer
      socket.on("fileTransfer", ({ acceptFile, sender }) => {
        if (acceptFile) {
          toast(`File request to ${sender.fullName} was accepted`);
        } else {
          toast.error(`File request to ${sender.fullName} was denied!`);
        }
        setState((prev) => ({ ...prev, isFileAccepted: acceptFile }));
      });

      // Get the message if it is the receiver
      socket.on(
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
          setState((prev) => ({
            ...prev,
            receivedMessageArray: updateReceivedMessageArray(
              prev.receivedMessageArray,
              msg,
              sender
            ),
          }));
        }
      );

      // Listen for the file being sent to this user
      socket.on("receiveFile", ({ fileName, fileType, fileData }) => {
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
    };

    setupSocketHandlers();

    // Check notification permission
    if ("Notification" in window) {
      if (
        Notification.permission === "granted" &&
        window.localStorage.getItem("notification")
      ) {
        setIsNotificationEnabled(true);
      } else {
        setIsNotificationEnabled(false);
      }
    } else {
      setIsNotificationEnabled(
        !!(window as Window).localStorage.getItem("notification")
      );
    }
    // Cleanup all listeners when the component unmounts
    return () => {
      socket.off("connect");
      socket.off("users");
      socket.off("senderId");
      socket.off("progressPer");
      socket.off("fileTransfer");
      socket.off("receiveMessage");
      socket.off("receiveFile");
    };
  }, [socket]);
}

export default useInitializer;
