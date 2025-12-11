import { createRouter, createWebHistory } from 'vue-router'
import NavHomeView from '../views/NavHomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NavHomeView
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue')
    }
  ]
})

// 全局路由守卫：强制设置标题
router.beforeEach((to, from, next) => {
  // 读取环境变量
  const siteTitle = import.meta.env.VITE_SITE_TITLE
  
  // 如果环境变量存在，强制使用环境变量
  if (siteTitle) {
    document.title = siteTitle
  } else {
    // 即使没有环境变量，也不要写具体的名字，防止穿帮
    document.title = 'Loading...' 
  }
  
  next()
})

export default router
