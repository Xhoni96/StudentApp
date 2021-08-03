module.exports = {
	mode: "jit",
	purge: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./public/index.html",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],

	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
	important: true,
};
