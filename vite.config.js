import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuePug from 'vite-plugin-pug'
import vueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

export default defineConfig({
  plugins: [
    vue(),
    vuePug(),
    vueI18nPlugin({
      runtimeOnly: false,
      strictMessage: false,
      compositionOnly: false,
      include: path.resolve(__dirname, './src/i18n/locales/**')
    })
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      }
    ],
    extensions: ['.ts', '.js', '.json', '.vue']
  },
  css: {
    preprocessorOptions: {
      stylus: {
        additionalData: [
          'mixins',
          'colors',
          'fonts',
        ]
            .map((f) => `@import "${path.resolve(__dirname, `src/styles/${f}.styl`)}"`)
            .join('\n')
      }
    }
  }
})
