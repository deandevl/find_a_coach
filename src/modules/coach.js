export default {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      coaches: [],
      /*coaches: [
        {
          id: 'c1',
          firstName: 'Maximilian',
          lastName: 'Schwarzmüller',
          areas: ['frontend', 'backend', 'career'],
          descrip:
            "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          rate: 30,
        },
        {
          id: 'c2',
          firstName: 'Julie',
          lastName: 'Jones',
          areas: ['frontend', 'career'],
          descrip:
            'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
          rate: 30,
        },
      ],*/
      /*id: '',
      firstName: '',
      lastName: '',
      areas: [],
      descrip: '',
      rate: 0,*/
    };
  },
  mutations: {
    registerCoach(state, payload) {
      state.coaches.push(payload);
    },
    setCoaches(state, payload) {
      state.coaches = payload;
    },
    setFetchTimestamp(state) {
      state.lastFetch = new Date().getTime();
    },
  },
  actions: {
    async registerCoach(context, payload) {
      const coach = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        areas: payload.areas,
        descrip: payload.descrip,
        rate: payload.rate,
      };
      const userId = context.rootGetters['auth/userId'];
      const token = context.rootGetters['auth/token'];
      const response = await fetch(
        `https://vue-http-demo-f5d82-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,
        {
          method: 'PUT',
          body: JSON.stringify(coach),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.message || 'Failed to register coach!'
        );
        throw error;
      }

      context.commit('registerCoach', {
        ...coach,
        id: userId,
      });
    },
    async loadCoaches(context, payload) {
      const currentTimestamp = new Date().getTime();
      const lastFetch = context.getters.lastFetch;

      if (
        !lastFetch ||
        payload.forceRefresh ||
        (lastFetch && (currentTimestamp - lastFetch) / 1000 > 20)
      ) {
        const response = await fetch(
          `https://vue-http-demo-f5d82-default-rtdb.firebaseio.com/coaches.json`
        );
        const responseData = await response.json();
        if (!response.ok) {
          const error = new Error(
            responseData.message || 'Failed to load coaches!'
          );
          throw error;
        }
        const coaches = [];
        for (const coachId in responseData) {
          const coach = {
            id: coachId,
            firstName: responseData[coachId].firstName,
            lastName: responseData[coachId].lastName,
            areas: responseData[coachId].areas,
            descrip: responseData[coachId].descrip,
            rate: responseData[coachId].rate,
          };
          coaches.push(coach);
        }
        context.commit('setCoaches', coaches);
        context.commit('setFetchTimestamp');
      }
    },
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0;
    },
    isCoach(_, getters, _2, rootGetters) {
      const coaches = getters.coaches;
      const userId = rootGetters.userId;
      const val = coaches.some((coach) => {
        return coach.id === userId;
      });
      return val;
    },
    lastFetch(state){
      return state.lastFetch;
    },
    /*shouldUpdate(state) {
      const lastFetch = state.lastFetch;
      if (!lastFetch) {
        return true;
      }
      const currentTimestamp = new Date().getTime();
      return (currentTimestamp - lastFetch) / 1000 > 20;
    },*/
  },
};
