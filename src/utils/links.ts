import { GrProjects } from "react-icons/gr";
import { GoDiscussionOutdated } from "react-icons/go";
import { FaSlideshare } from "react-icons/fa6";
import { RiUserCommunityFill } from "react-icons/ri";
import { LuLibraryBig } from "react-icons/lu";
export const navbar_links = [
	{
		url: "/",
		label: "Home",
	},
	{
		url: "/opened-projects",
		label: "Opened-Projects",
	},
	{
		url: "/",
		label: "Post",
	},
	{
		url: "/",
		label: "Contact",
	},
];
export const sidebar_links = [
	{ url: "/opened-projects", label: "Open Sources", Icon: GrProjects },
	{
		url: "/opened-projects/discussions",
		label: "Discussion",
		Icon: GoDiscussionOutdated,
	},
	{
		url: "/opened-projects/share",
		label: "Share a source",
		Icon: FaSlideshare,
	},
	{
		url: "/opened-projects/communities",
		label: "Communities",
		Icon: RiUserCommunityFill,
	},
	{
		url: "/opened-projects/packages",
		label: "Share your library",
		Icon: LuLibraryBig,
	},
];
