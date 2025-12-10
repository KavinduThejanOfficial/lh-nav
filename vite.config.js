import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => {
  // 1. 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  
  // 2. 确定最终标题：优先用 VITE_SITE_TITLE，没有则用 VITE_SITE_NAME，再没有就用默认值
  const finalTitle = env.VITE_SITE_TITLE || env.VITE_SITE_NAME || '猫猫导航'

  return {
    plugins: [
      vue(),
      vueDevTools(),
      // 3. 核心插件：在构建时处理 HTML
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          // 只要发现 %SITE_TITLE% 这个字符串，就替换成 finalTitle
          return html.replace(/%SITE_TITLE%/g, finalTitle)
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
