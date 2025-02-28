import { jetBrains_font } from "@/assets/fonts";
import MapComponents from "@/components/mapComponents";
import React from "react";

function ProjectCard() {
  return (
    <article className="h-[300px] w-[300px] flex-shrink-0 bg-zinc-600/15 rounded-xl flex flex-col items-center shadow-sm ">
      <MapComponents
        className="-translate-y-[50%] flex gap-3 "
        items_to_map={["JS", "Python", "Angular"]}
        method={(item) => {
          return (
            <span
              className={`bg-blue_custom text-xs p-2 py-1 rounded-3xl ${jetBrains_font.className} text-white`}
              key={item}
            >
              {item}
            </span>
          );
        }}
      />
    </article>
  );
}

export default ProjectCard;
