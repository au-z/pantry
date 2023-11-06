import { defineConfig } from 'vite'
import CssHmr from 'rollup-plugin-css-hmr'

export default defineConfig({
  plugins: [
    {
      ...CssHmr({
        '*': {},
      }),
      enforce: 'post',
    },
  ],
})
