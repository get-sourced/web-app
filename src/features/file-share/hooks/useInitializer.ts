import { useCallback, useEffect, useMemo } from "react";
import type { Socket } from "socket.io-client";
import { useGlobalState } from "../context/useStateContext";
import { Initialize } from "../lib/initializerClass";
function useInitializer(socket: Socket) {
  const { setIsNotificationEnabled, setState } = useGlobalState();
  const initializer = useMemo(() => {
    return new Initialize(socket, setState);
  }, [setState, socket]);
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    initializer.onConnect();
    initializer.getUsers();
    initializer.onGetSender();
    initializer.onFileResponse();
    initializer.onProgress();
    initializer.onReceiveComplete();
    initializer.onReceiveChunks();
    initializer.onMessage();
    initializer.onRejectTransfer();
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
    return () => {
      initializer.clearSockets();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const chooseFileLocation = useCallback(() => {
    return initializer.checkIfCanWriteToFile();
  }, [initializer]);
  return { chooseFileLocation };
}

export default useInitializer;
