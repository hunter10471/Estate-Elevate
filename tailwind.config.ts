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
				primary: "#007BFF",
				primaryLight: "#6FAFFF",
				primaryDark: "#0056b3",
				text: "#333333",
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
