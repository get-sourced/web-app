import MapComponents from "@/components/mapComponents";
import ProjectCard from "@/features/opened projects/projectCard";
import React from "react";

function Projects() {
	return (
		<MapComponents
			className="flex gap-5 flex-wrap w-full"
			items_to_map={new Array(3).fill(0)}
			method={(item) => {
				return <ProjectCard key={item} />;
			}}
		/>
	);
}

export default Projects;
