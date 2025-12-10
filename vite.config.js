import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  
  // 优先级：VITE_SITE_TITLE > VITE_SITE_NAME > 默认值
  const appTitle = env.VITE_SITE_TITLE || env.VITE_SITE_NAME || '猫猫导航'

  return {
    plugins: [
      vue(),
      vueDevTools(),
      // 核心插件：替换 index.html 中的 %SITE_TITLE%
      {
        name: 'html-title-transform',
        transformIndexHtml(html) {
          return html.replace(/%SITE_TITLE%/g, appTitle)
        }
      }
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
