import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  
  // 获取标题配置，优先使用 VITE_SITE_TITLE，如果没有则用 VITE_SITE_NAME，最后兜底
  const appTitle = env.VITE_SITE_TITLE || env.VITE_SITE_NAME || '猫猫导航'

  return {
    plugins: [
      vue(),
      vueDevTools(),
      // 核心修复插件：构建时直接替换 HTML 标题
      {
        name: 'html-title-transform',
        transformIndexHtml(html) {
          // 查找 <title> 标签并替换内容
          return html.replace(
            /<title>(.*?)<\/title>/,
            `<title>${appTitle}</title>`
          )
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
