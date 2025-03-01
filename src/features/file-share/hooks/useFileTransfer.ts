import { useEffect } from "react";

import type { Socket } from "socket.io-client";
import { useGlobalState } from "../context/useStateContext";
import { toast } from "@/components/Toaster/Toast";

function useFileTransfer(handleSendFile: () => void, socket: Socket) {
  const { setState, state } = useGlobalState();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (state.file && state.isFileAccepted) {
      handleSendFile();
      setState((prev) => ({ ...prev, isFileAccepted: null }));
    } else if (state.file && state.isFileAccepted !== null) {
      socket.emit("getSender", {
        targetUser: state.selectedUser,
        name: state.file.name,
        size: state.file.size,
      });
      toast(`File request sent to ${state?.selectedUser?.fullName}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.file, state.isFileAccepted]);
}

export default useFileTransfer;
