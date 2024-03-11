import adapterStatic from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		}),
	],
	kit: {
		adapter: adapterStatic({ pages: 'build', assets: 'build', fallback: 'index.html' })
	},
	vitePlugin: []
};

export default config;
