import defaultTheme from 'tailwindcss/defaultTheme';
import skeletonPlugin from '@skeletonlabs/skeleton/tailwind/skeleton.cjs';
import path from 'path';

/** @type {import('tailwindcss').Config}*/
const config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		path.join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Wix Madefor Display', ...defaultTheme.fontFamily.sans],
				header: ['Roboto', ...defaultTheme.fontFamily.sans]
			}
		}
	},

	plugins: [...skeletonPlugin()]
};

module.exports = config;
