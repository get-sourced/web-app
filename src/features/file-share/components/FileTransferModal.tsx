import { jetBrains_font, karla_font } from "@/assets/fonts";
import { useGlobalState } from "../context/useStateContext";
import { getFixedSize, getName } from "../lib/utils";

type prop = {
  onAccept: () => void;
  onDecline: () => void;
};
export const FileTransferModal = ({ onAccept, onDecline }: prop) => {
  const { state } = useGlobalState();
  const { receivedFileArray, receivedFile } = state;
  const isVisible = state.receivedFile !== null;
  return (
    <div
      className={`fixed h-full w-full flex items-center justify-center bg-black bg-opacity-50 z-40 px-3 transition-all  duration-300 left-0 top-0 ${
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
            File Transfer Requested
          </h3>
        </div>
        {receivedFileArray.length > 0 && receivedFile && (
          <p className={"text-secondary_color  font-semibold "}>
            <span className="bg-zinc-500/15 p-2 text-secondary_color">
              {getName("fileSender", state)}
            </span>{" "}
            would like to share
            <span className="font-semibold">{receivedFile.name}</span>{" "}
            {`( ${getFixedSize(receivedFile.size)} )`}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            className="py-1 p-3 bg-zinc-500/15 disabled:opacity-5 text-secondary_color"
            onClick={onDecline}
          >
            DECLINE
          </button>
          <button
            type="button"
            className="py-1 p-3 bg-sky-600 text-secondary_color"
            onClick={onAccept}
          >
            ACCEPT
          </button>
        </div>
      </div>
    </div>
  );
};
