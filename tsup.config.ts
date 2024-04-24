import { defineConfig } from 'tsup'
import { sassPlugin } from 'esbuild-sass-plugin'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  entry: ['lib/index.ts'],
  format: ['cjs', 'esm'],
  minify: true,
  dts: true,
  splitting: false,
  clean: true,
  esbuildOptions(options, context) {
    options.drop = ['console', 'debugger']
  },
  esbuildPlugins: [
    sassPlugin({
      type: 'css',
      filter: /\.scss$/,
      async transform(source, resolveDir) {
        const { css } = await postcss([autoprefixer]).process(source)
        return css
      }
    })
  ]
})
