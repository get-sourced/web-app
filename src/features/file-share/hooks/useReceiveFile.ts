import { useEffect } from "react";
import { useGlobalState } from "../context/useStateContext";
function useReceiveFile() {
  const { setState, state } = useGlobalState();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const processReceivedFiles = () => {
      if (state.receivedFile === null) {
        setTimeout(() => {
          if (state.receivedFileArray.length > 0) {
            const file = state.receivedFileArray[0];
            setState((prev) => ({
              ...prev,
              receivedFile: file,
            }));
          }
        }, 400);
      }
    };

    processReceivedFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.receivedFile, state.receivedFileArray, state.currentUser]);
}

export default useReceiveFile;
