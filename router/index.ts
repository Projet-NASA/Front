import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import postComment from '../pages/postComment.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/post/:postId',
    name: 'PostComment',
    component: postComment
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
