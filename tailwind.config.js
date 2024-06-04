/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
				"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				"light-yellow": "#FFFAEA", 
				"yellow": "#F5C265", 
				"font-yellow": "#F0A61D", 
				"light-red": "#FFECEA", 
				"red": "#C05E51", 
				"light-green": "#EDFBED", 
				"green": "#5A6E5A", 
				"dark-green": "#5B6E5A", 
				"cream": "#D8D5C4", 
				"dark-cream": "#A09C8A", 
				"light-cream": "#FCFBF7", 
				"skin": "#FADEAD", 
			},
		},
	},
	plugins: [],
};
