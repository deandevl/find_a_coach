import { createStore } from 'vuex';
import coachModule from './modules/coach.js';
import requestModule from './modules/request.js';
import authModule from './modules/auth.js';

const store = createStore({
  modules: {
    coach: coachModule,
    request: requestModule,
    auth: authModule,
  },
});

export default store;
