import type { Socket } from "socket.io-client";
import type { ChangeEvent } from "react";
import { useGlobalState } from "../context/useStateContext";

// src/hooks/useSocketHandlers.ts
export const useSocketHandlers = (socket: Socket) => {
  const { setState, state, setIsNotificationEnabled } = useGlobalState();
  // File handling
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setState((prev) => ({
      ...prev,
      file: selectedFile,
      isFileAccepted: false,
    }));
  };
  // File responses
  const handleSendFile = () => {
    const CHUNK_SIZE = 64 * 1024; // 64KB per chunk
    const totalChunks = Math.ceil((state?.file?.size as number) / CHUNK_SIZE);
    let currentChunk = 0;
    const reader = new FileReader();

    reader.onload = () => {
      const chunk = reader.result;
      socket.emit("sendFileChunk", {
        targetUserId: state.selectedUser,
        fileData: chunk,
        chunkNumber: currentChunk,
        totalChunks,
        fileName: state?.file?.name,
        fileType: state?.file?.type,
      });

      currentChunk += 1;
      const progressPer = (currentChunk / totalChunks) * 100;
      setState((prev) => ({ ...prev, progress: progressPer }));

      socket.emit("progress", {
        progressPer,
        targetUserId: state.selectedUser,
      });

      if (currentChunk < totalChunks) {
        readNextChunk();
        console.log("sending");
      } else {
        console.log("sent");
        // TODO: Add a toast
      }
    };

    const readNextChunk = () => {
      const start = currentChunk * CHUNK_SIZE;
      const end = Math.min(state?.file?.size as number, start + CHUNK_SIZE);
      const blob = state?.file?.slice(start, end);
      if (blob) reader.readAsArrayBuffer(blob);
    };

    // Start reading the first chunk
    readNextChunk();
  };

  const acceptFileResponse = () => {
    setState((prev) => ({ ...prev, receivedFile: null }));
    socket.emit("fileResponse", {
      acceptFile: true,
      senderId: state.senderUser?.senderId,
    });
  };

  const declineFileResponse = () => {
    setState((prev) => ({ ...prev, receivedFile: null }));
    socket.emit("fileResponse", {
      acceptFile: false,
      senderId: state.senderUser?.senderId,
    });
  };

  // Message handling
  const sendMessageHandler = () => {
    // toast({
    //   description: "Message transfer completed",
    //   mode: darkMode,
    // });
    //TODO: Add a toast
    setState((prev) => ({ ...prev, messageBox: false }));
    socket.emit("sendMessage", {
      msg: state.text,
      targetUserId: state.selectedUser,
    });
    setState((prev) => ({ ...prev, text: "" }));
  };

  const copyMessageHandler = () => {
    setState((prev) => ({ ...prev, receivedMsg: "" }));
    navigator.clipboard
      .writeText(state.receivedMsg)
      .then(() => {
        // toast({
        //   description: "Copied to clipboard",
        //   mode: darkMode,
        // });
        //TODO: Add a toast
      })
      .catch((err) => {
        console.log("Failed to copy text: ", err);
      });
  };

  // UI handlers
  const handleClick = () => {
    if (state.fileInputRef.current) {
      // Reset the input value to allow the same file to be selected again
      state.fileInputRef.current.value = "";
      setState((prev) => ({ ...prev, file: null })); // Clear the previously selected file in state
    }
  };

  const enableNotifications = async () => {
    if (Notification.permission && localStorage.getItem("notification")) {
      localStorage.removeItem("notification");
      setIsNotificationEnabled(false);
      return;
    }
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      localStorage.setItem("notification", "true");
      setIsNotificationEnabled(true);
    } else {
      localStorage.removeItem("notification");
      setIsNotificationEnabled(false);
    }
  };

  return {
    handleFileChange,
    handleSendFile,
    acceptFileResponse,
    declineFileResponse,
    sendMessageHandler,
    copyMessageHandler,
    handleClick,
    enableNotifications,
  };
};
