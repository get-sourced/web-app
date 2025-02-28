import { jetBrains_font } from "@/assets/fonts";
import { useGlobalState } from "../context/useStateContext";
export const UserInfo = () => {
  const { state } = useGlobalState();
  return (
    <div className={`absolute bottom-1 gap-2 ${jetBrains_font.className}`}>
      <p className={"md:text-lg text-center pb-1 text-secondary_color"}>
        You are known as:{" "}
        <span className="text-light_grey font-bold">
          {state.currentUser?.name}
        </span>
      </p>
      {/* <div className="mt-2 space-x-2 border-2 border-gray-400 p-1 rounded-2xl flex flex-col justify-center">
        <p className={"text-center text-base text-secondary_color "}>
          You can be discovered:
        </p>
        <button
          type="button"
          className="bg-blue-500 text-base text-white px-3 py-0 rounded-lg self-center mt-1"
        >
          on this network
        </button>
      </div> */}
    </div>
  );
};
