import type { stateType } from "../lib/types";
import { useGlobalState } from "../context/useStateContext";
import Platform from "./Platform";
import ProgressComponent from "./ProgressComponent";
import MapComponents from "@/components/mapComponents";
import { jetBrains_font } from "@/assets/fonts";
type key = keyof stateType["state"];
export const UserGrid = () => {
  const { state, setState } = useGlobalState();
  const setStateWithKey = (key: key, val: stateType["state"][key]) => {
    setState((prev) => ({ ...prev, [key]: val }));
  };
  return (
    <div className="flex justify-center gap-x-16 gap-y-4 items-center w-full  z-[2] flex-col">
      <MapComponents
        className=" flex gap-2 flex-wrap overflow-x-auto justify-center gap-x-16 gap-y-4 items-center w-full max-h-[20vh] md:max-h-[40vh] py-2 overflow-y-scroll "
        items_to_map={state.users}
        method={(user) => {
          return (
            <button
              type="button"
              key={user.id}
              onContextMenu={(e) => {
                e.preventDefault();
                setStateWithKey("messageBox", true);
                setStateWithKey("selectedUser", user.id);
                setStateWithKey("initial", false);
              }}
              className="flex flex-col items-center justify-center cursor-pointer "
              onClick={() => {
                setStateWithKey("selectedUser", user.id);
                document.getElementById("file")?.click();
              }}
            >
              <div
                className={
                  'relative  border-light_grey h-12 w-12  rounded-full before:content-[" "] before:absolute before:left-[37%] before:bottom-[-20%] before:w-[26%] before:h-[10%] before:bg-light_grey before:rounded-full hover:transition-transform duration-300 hover:bg-zinc-600/20 hover:scale-105 '
                }
              >
                <ProgressComponent state={state} user={user} />
                <Platform option={user.userAgent} />
              </div>
              <div className="text-center mt-3">
                <p
                  className={`text-sm font-semibold text-secondary_color ${jetBrains_font.className}`}
                >
                  {user.fullName}
                </p>
                <p className={"text-xs font-semibold text-light_grey"}>
                  {user.userAgent}
                </p>
              </div>
            </button>
          );
        }}
      />
      {!state.users.length && (
        <div className="w-full flex items-center gap-2 flex-col text-center">
          <p className={`text-secondary_color text-lg ${jetBrains_font.className}`}>
            Open this page on other devices to send files
          </p>
          <p className={"text-center text-base text-light_grey"}>
            From Your Screen to Theirs - Fast, Secure, Connected.
          </p>
        </div>
      )}
    </div>
  );
};
