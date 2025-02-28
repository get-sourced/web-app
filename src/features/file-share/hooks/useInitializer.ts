/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import type { Socket } from "socket.io-client";
import {
  getRandomName,
  updateFilesArray,
  updateReceivedMessageArray,
} from "../lib/utils";
import { useGlobalState } from "../context/useStateContext";
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
      });

      // Receive the list of all connected users
      socket.on("users", (usersList: User[]) => {
        const users_ = usersList.filter((user) => user.id !== socket.id);
        setState((prev) => ({ ...prev, users: users_ }));
      });

      // Get the sender ID, file name, and size if it is the receiver
      socket.on("senderId", (data) => {
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
          console.log(progressPer);
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
      socket.on("fileTransfer", ({ acceptFile }) => {
        setState((prev) => ({ ...prev, isFileAccepted: acceptFile }));
      });

      // Get the message if it is the receiver
      socket.on("receiveMessage", ({ msg, senderId }) => {
        setState((prev) => ({
          ...prev,
          receivedMessageArray: updateReceivedMessageArray(
            prev.receivedMessageArray,
            msg,
            senderId
          ),
        }));
      });

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
        //TODO:Add toast
        // toast({
        //   description: "File received successfully",
        //   mode: darkMode,
        // });
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
