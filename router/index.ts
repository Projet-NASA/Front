import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import postComment from '../pages/postComment.vue'; // Importez votre composant pour afficher les commentaires du post

const routes: Array<RouteRecordRaw> = [
  {
    path: '/post/:postId', // Définissez un paramètre dynamique postId
    name: 'PostComment',
    component: postComment,
  },
  // Autres routes
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
