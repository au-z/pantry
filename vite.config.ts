import {defineConfig} from 'vite'
import CssHmr from './build/rollup-plugin-css-hmr.js'
import path from 'path'

export default defineConfig({
	plugins: [
		{
			...CssHmr('.ts'),
			enforce: 'post',
		}
	],
})