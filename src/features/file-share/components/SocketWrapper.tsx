import { io } from "socket.io-client";
import useInitializer from "../hooks/useInitializer";
import useFileTransfer from "../hooks/useFileTransfer";
import useReceiveFile from "../hooks/useReceiveFile";
import useReceivedMessage from "../hooks/useReceivedMessage";
import { useSocketHandlers } from "../hooks/useSocketHandlers";
import { BackgroundCircles } from "./BackgroundCircles";
import { Header } from "./Header";
import { useGlobalState } from "../context/useStateContext";
import { UserGrid } from "./UserGrid";
import { UserInfo } from "./UserInfo";
import { FileTransferModal } from "./FileTransferModal";
import { handleFileArr, handleMsgArr } from "../lib/utils";
import ReceivedMessageModal from "./ReceivedMessageModal";
import { MessageModal } from "./MessageModal";
import { useMemo } from "react";
import { karla_font } from "@/assets/fonts";
// Create socket instance
function SocketWrapper() {
  const socket = useMemo(() => {
    return io("https://get-sourced-webhook.onrender.com/", {
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      forceNew: true,
      timeout: 60000,
    });
  }, []);
  const { state, setState } = useGlobalState();
  const {
    enableNotifications,
    handleSendFile,
    handleFileChange,
    handleClick,
    acceptFileResponse,
    declineFileResponse,
    sendMessageHandler,
    copyMessageHandler,
  } = useSocketHandlers(socket);
  // Initialize socket connection and register event handlers
  useInitializer(socket);
  // Process file transfers
  useFileTransfer(handleSendFile, socket);
  // Handle received files
  useReceiveFile();
  // Handle received messages
  useReceivedMessage();
  return (
    <div
      className={`relative w-full md:h-[84vh] h-[80vh]  ${karla_font.className}`}
    >
      <div
        className={
          "relative min-h-full flex justify-center items-center overflow-hidden transition-all duration-500 flex-col gap-6"
        }
      >
        {/* User Grid */}
        <UserGrid />
        {/* Instructions Text */}
        {state.users.length > 0 && (
          <p
            className={
              "text-center top-[12%] text-[0.95rem] font-medium text-light_grey"
            }
          >
            {`Click to send files or ${
              window.innerWidth > 650 ? "right click" : "long tap"
            } to send a message `}
          </p>
        )}
        {/* Background circles */}
        <BackgroundCircles />
        {/* Header with theme and notification toggles */}
        <Header enableNotification={enableNotifications} />

        {/* Hidden file input */}
        <input
          type="file"
          id="file"
          ref={state.fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          onClick={handleClick}
        />

        {/* Current user info */}
        <UserInfo />

        {/* File Transfer Request Modal */}
        <FileTransferModal
          onAccept={() => {
            acceptFileResponse();
            handleFileArr(setState);
          }}
          onDecline={() => {
            declineFileResponse();
            handleFileArr(setState);
          }}
        />
        {/* Message Sending Modal */}
        <MessageModal onSend={sendMessageHandler} />

        {/* Received Message Modal */}
        <ReceivedMessageModal
          onClose={() => {
            setState((prev) => ({ ...prev, receivedMsg: "" }));
            handleMsgArr(state, setState);
          }}
          onCopy={() => {
            copyMessageHandler();
            handleMsgArr(state, setState);
          }}
        />
      </div>
    </div>
  );
}

export default SocketWrapper;
