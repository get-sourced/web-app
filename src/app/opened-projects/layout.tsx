import { Toast } from "@/components/Toaster/Toast";
import React, { type ReactNode } from "react";
function OpenedProjects({
  content,
  sidebar,
}: {
  sidebar: ReactNode;
  content: ReactNode;
}) {
  return (
    <div className="w-full flex gap-2 px-2 md:px-0 relative">
      {sidebar}
      {content}
      <Toast duration={9000} />
    </div>
  );
}

export default OpenedProjects;
