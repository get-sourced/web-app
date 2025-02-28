import { MdOutlinePodcasts } from "react-icons/md";
export const BackgroundCircles = () => {
  return (
    <div className="flex w-full  h-full relative justify-center items-center">
      {/* Center icon */}
      <div className="text-light_grey">
        <MdOutlinePodcasts style={{ fontSize: "50px" }} />
      </div>
      <div className="absolute rounded-full border-2 border-secondary_color h-[480px] w-[480px] animate-ping" />
      <div className="absolute rounded-full border-2 border-secondary_color h-[400px] w-[400px] animate-ping" />
      <div className="absolute rounded-full border-2 border-secondary_color h-[320px] w-[320px] animate-ping" />
      <div className="absolute rounded-full border-2 border-secondary_color h-[240px] w-[240px] animate-ping" />
      <div className="absolute rounded-full border-2 border-secondary_color h-[180px] w-[180px] animate-ping" />
      <div className="absolute rounded-full border-2 border-secondary_color h-[100px] w-[100px] animate-ping" />
    </div>
  );
};
