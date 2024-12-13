import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/product-details/:id',
      name: 'product-details',
      component: () => import('../views/ProductDetailsView.vue')
    },
    {
      path: '/error',
      name: 'error-page',
      component: () => import('../views/ErrorPageView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    },
  ]
});

router.onError((error) => {
  console.error('Router error:', error);
  router.push('/error');
});

export default router
