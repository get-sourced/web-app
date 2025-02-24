import React, { type ReactNode } from "react";
function OpenedProjects({
	content,
	sidebar,
}: { sidebar: ReactNode; content: ReactNode }) {
	return (
		<div className="w-full flex gap-2 px-2 md:px-0">
			{sidebar}
			{content}
		</div>
	);
}

export default OpenedProjects;
