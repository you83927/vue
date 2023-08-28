import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      updatedInfo: null,
    };
  },
  mutations: {
    updateInfo(state, info) {
      state.updatedInfo = info;
    },
  },
  actions: {
    setUpdatedInfo({ commit }, info) {
      commit('updateInfo', info);
    },
  },
});

export default store;