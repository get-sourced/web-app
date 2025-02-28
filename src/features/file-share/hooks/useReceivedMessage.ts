import { useEffect } from "react";
import { useGlobalState } from "../context/useStateContext";

function useReceivedMessage() {
  const { setState, state } = useGlobalState();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const processReceivedMessages = () => {
      if (state.receivedMsg === "") {
        setTimeout(() => {
          if (state.receivedMessageArray.length > 0) {
            setState((prev) => ({
              ...prev,
              receivedMsg: state.receivedMessageArray[0].text,
            }));
          }
        }, 400);
      }
    };

    processReceivedMessages();
  }, [state.receivedMsg, state.receivedMessageArray]);
}

export default useReceivedMessage;
