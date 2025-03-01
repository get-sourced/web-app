import React from "react";
import type { stateType } from "../lib/types";

function ProgressComponent({
  user,
  state,
}: {
  user: User;
  state: stateType["state"];
}) {
  return (
    state.progress > 0 &&
    (user.id === state.senderUser?.sender.id ||
      user.id === state.selectedUser?.id) && (
      // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
      <svg
        className="absolute top-0 left-0 w-[calc(100%+8px)] h-[calc(100%+8px)] -translate-x-1 -translate-y-1"
        viewBox="0 0 36 36"
      >
        <path
          className="text-zinc-500"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          className="text-secondary_color"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="100"
          strokeDashoffset={100 -  state.progress}
          style={{
            transition: "stroke-dashoffset 0.5s ease",
          }}
        />
      </svg>
    )
  );
}

export default ProgressComponent;
