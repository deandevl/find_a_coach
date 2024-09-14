export default {
  namespaced: true,
  state() {
    return {
      requests: [],
      /*coachId: "",
      message: "",
      email: "",*/
    };
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload);
    },
    setRequests(state, payload) {
      state.requests = payload;
    },
  },
  actions: {
    async contactCoach(context, payload) {
      const request = {
        email: payload.email,
        message: payload.message,
      };
      const response = await fetch(
        `https://vue-http-demo-f5d82-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
        {
          method: 'POST', //do not want to overwrite the data-just add the data.
          body: JSON.stringify(request),
        }
      );
      const responseData = await response.json();
      request.id = responseData.name; // with POST, firebase returns a unique generated id (name)
      request.coachId = payload.coachId;
      if (!response.ok) {
        const error = new Error(
          responseData.message || 'Failed to save request!'
        );
        throw error;
      }

      context.commit('addRequest', request);
    },
    async loadRequests(context){
      const userId = context.rootGetters['auth/userId'];
      const token = context.rootGetters['auth/token'];
      const response = await fetch( //send a GET http request
        `https://vue-http-demo-f5d82-default-rtdb.firebaseio.com/requests/${userId}.json?auth=${token}`
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to load requests!');
        throw error;
      }
      const requests = [];
      for (const requestId in responseData) {
        const request = {
          id: requestId,
          coachId: userId,
          email: responseData[requestId].email,
          message: responseData[requestId].message,
        };
        requests.push(request);
      }
      context.commit('setRequests', requests);
    },
  },
  getters: {
    requests(state, _, _2, rootGetters) {
      const userId = rootGetters['auth/userId'];
      const filtered_reqs = state.requests.filter((req) => {
        return req.coachId === userId;
      });
      return filtered_reqs;
    },
    hasRequests(_, getters) {
      return getters.requests && getters.requests.length > 0;
    },
  },
};
