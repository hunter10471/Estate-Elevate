import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#4FBDBA",
				primaryLight: "#AEFEFF",
				primaryDark: "#35858B",
				text: "#072227",
			},
			fontFamily: {
				body: ["Roboto", "sans-serif"],
				heading: ["Poppins", "sans-serif"],
			},
		},
	},
	plugins: [],
};
export default config;
