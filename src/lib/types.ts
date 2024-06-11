import { IconType } from "react-icons";

export interface PropertyType {
	icon: IconType;
	name: string;
	query: string;
}

export interface NavLink {
	name: string;
	path: string;
}
