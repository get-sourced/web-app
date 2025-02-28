import { jetBrains_font, karla_font } from "@/assets/fonts";
import { useGlobalState } from "../context/useStateContext";
import { getName } from "../lib/utils";

type prop = {
  onClose: () => void;
  onCopy: () => void;
};
function ReceivedMessageModal({ onClose, onCopy }: prop) {
  const { state, isNotificationEnabled } = useGlobalState();
  const { receivedMessageArray, receivedMsg } = state;
  const isVisible = state.receivedMsg !== "" && isNotificationEnabled;
  return (
    receivedMessageArray.length > 0 && (
      <div
        className={`fixed h-full w-full flex items-center justify-center bg-black bg-opacity-50 z-40 px-3 transition-all  duration-300 ${
          karla_font.className
        } ${isVisible ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <div
          className={`bg-primary_color rounded-md shadow-lg w-[450px] transition-transform duration-300 overflow-hidden flex flex-col gap-3 p-2 ${
            isVisible ? "scale-100" : "scale-80"
          }`}
        >
          <div className="flex  bg-primary_color">
            <h3 className={`text-lg font-medium   ${jetBrains_font.className}`}>
              Message Received{" "}
            </h3>
          </div>
          {receivedMessageArray.length > 0 && (
            <p
              className={
                "text-secondary_color  font-semibold flex gap-2 items-center"
              }
            >
              <span className="font-medium text-secondary_color  text-base ml-1">
                {getName("msgSender", state)}
              </span>
              has sent:
              <br />
            </p>
          )}
          <p className="outline-none text-secondary_color  bg-zinc-500/15  p-2">
            {receivedMsg}
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              className="py-1 p-3 bg-zinc-500/15 disabled:opacity-5 text-secondary_color"
              onClick={onClose}
            >
              CLOSE
            </button>
            <button
              type="button"
              className="py-1 p-3 bg-sky-600 text-secondary_color"
              onClick={onCopy}
            >
              COPY
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default ReceivedMessageModal;
