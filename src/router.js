import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from 'vuex';
//import CoachesList from './components/coaches/CoachesList.vue';
//import CoachDetail from './components/coaches/CoachDetail.vue';
//import CoachContactForm from './components/coaches/CoachContactForm.vue';
//import CoachRegistration from './components/coaches/CoachRegistration.vue';
//import RequestsList from './components/requests/RequestsList.vue';
//import UserAuth from './components/ui/UserAuth.vue';
//import NotFound from './components/ui/NotFound.vue';

const CoachesList = () => import('./components/coaches/CoachesList.vue');
const CoachDetail = () => import('./components/coaches/CoachDetail.vue');
const CoachContactForm = () => import('./components/coaches/CoachContactForm.vue');
const CoachRegistration = () => import('./components/coaches/CoachRegistration.vue');
const RequestsList = () => import('./components/requests/RequestsList.vue');
const NotFound = () => import('./components/ui/NotFound.vue');
const UserAuth = () => import('./components/ui/UserAuth.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      redirect: '/coaches',
    },
    {
      name: 'coaches',
      path: '/coaches', // /coaches
      component: CoachesList,
    },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [
        {
          path: 'contact', // /coaches/c1/contact
          component: CoachContactForm,
          props: true,
        },
      ],
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: RequestsList,
      meta: { requiresAuth: true },
    },
    {
      path: '/auth',
      component: UserAuth,
      meta: { requiresUnauth: true },
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});

// route guardrails
router.beforeEach(function (to, _, next) {
  const store = useStore();
  if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
    next('/auth');
  }else if(to.meta.requiresUnauth && store.getters['auth/isAuthenticated']){
    next('/coaches');
  }else {
    next();
  }
});

export default router;
