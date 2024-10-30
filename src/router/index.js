import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout/index.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManageView.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannelView.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfileView.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatarView.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPasswordView.vue')
        }
      ]
    },
    { path: '/login', component: () => import('@/views/login/LoginView.vue') }
  ]
})

export default router
