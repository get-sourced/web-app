import { jetBrains_font, karla_font } from "@/assets/fonts";
import { useGlobalState } from "../context/useStateContext";
type messageProp = {
  onSend: () => void;
};
export const MessageModal = ({ onSend }: messageProp) => {
  const { state, setState } = useGlobalState();
  const { selectedUser, initial, messageBox, text } = state;
  return (
    (selectedUser || initial) && (
      <div
        className={`left-0 top-0 fixed h-full w-full flex items-center justify-center bg-black bg-opacity-50 z-40 px-3 transition-all  duration-300 ${
          karla_font.className
        } ${messageBox ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <div
          className={`bg-primary_color rounded-md shadow-lg w-[450px] transition-transform duration-300 overflow-hidden flex flex-col gap-3 p-2 ${
            messageBox ? "scale-100" : "scale-80"
          }`}
        >
          <div className="flex  bg-primary_color">
            <h3 className={`text-lg font-medium   ${jetBrains_font.className}`}>
              Send Message
            </h3>
          </div>
          {!initial && (
            <p
              className={
                "text-secondary_color  font-semibold flex gap-2 items-center"
              }
            >
              <span className="bg-zinc-500/15 p-2"> To:</span>

              <span className="font-medium text-secondary_color  text-base ml-1">
                {state.selectedUser?.fullName}
              </span>
              <br />
            </p>
          )}

          <textarea
            name="primary"
            className="outline-none  bg-zinc-500/15  p-2"
            placeholder="Type message..."
            onChange={(e) =>
              setState((pre) => ({ ...pre, text: e.target.value }))
            }
            value={text}
          />

          <div className="flex gap-3">
            <button
              type="button"
              className="py-1 p-3 bg-zinc-500/15 disabled:opacity-5 text-secondary_color"
              onClick={() => setState((pre) => ({ ...pre, messageBox: false }))}
            >
              CANCLE
            </button>
            <button
              type="button"
              className="py-1 p-3 bg-sky-600 text-secondary_color"
              disabled={text.length === 0}
              onClick={() => onSend()}
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    )
  );
};
