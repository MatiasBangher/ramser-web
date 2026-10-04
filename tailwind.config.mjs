import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				paper: { DEFAULT: '#F1ECE2', 2: '#E8E1D3' },
				ink: { DEFAULT: '#1B1D18', 2: '#3A3D35' },
				soil: '#A9472A',
				leaf: '#6DB64A',
				monte: { DEFAULT: '#1F3A1E', 2: '#2A4A27' },
				olive: '#5C6B3C',
				rule: 'rgba(27, 29, 24, 0.18)',
			},
			fontFamily: {
				serif: ['"Instrument Serif"', 'Georgia', ...defaultTheme.fontFamily.serif],
				sans: ['"Public Sans Variable"', ...defaultTheme.fontFamily.sans],
				mono: ['"IBM Plex Mono"', ...defaultTheme.fontFamily.mono],
			},
			maxWidth: { page: '1320px' },
		},
	},
	plugins: [],
};
