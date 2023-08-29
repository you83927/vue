// // store.js

// import { createStore } from 'vuex';

// const store = createStore({
//   state: {
//     userInformation: {}, // 保存每个用户的信息和更新历史
//     currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
//      // 当前登录的用户标识
//   },
//   mutations: {
//     updateUserInformation(state, { userId, information }) {
//       if (!state.userInformation[userId]) {
//         state.userInformation[userId] = { information, updateHistory: [] };
//       } else {
//         state.userInformation[userId].information = information;
//       }
//     },
//     updateUpdateHistory(state, { userId, payload }) {
//       state.userInformation[userId].updateHistory.push(payload);
//     },
//     setCurrentUser(state, userId) {
//       state.currentUser = userId;
//     },
//     clearCurrentUser(state) {
//       state.currentUser = null;
//     },
//     updateUserUpdateHistory(state, { userId, update }) {
//       if (!state.userUpdateHistory[userId]) {
//         state.userUpdateHistory[userId] = [];
//       }
//       state.userUpdateHistory[userId].push(update);
//     },
//   },
//   actions: {
//     async setInformation({ commit, state }, payload) {
//       const userId = state.currentUser;
//       if (userId) {
//         commit('updateUserInformation', { userId, information: payload });
//         commit('updateUpdateHistory', { userId, payload });
//       }
//       return 'Information updated successfully';
//     },
//     clearUpdateHistoryChanged({ commit }) {
//       commit('clearUpdateHistoryChanged');
//     },
//     login({ commit }, userId) {
//       commit('setCurrentUser', userId);

//       localStorage.setItem('currentUser', JSON.stringify(userId));
//     },
//     logout({ commit }) {
//       commit('clearCurrentUser');
//     },
//   },
//   getters: {
//     getInformation: state => {
//       const userId = state.currentUser;
//       if (userId && state.userInformation[userId]) {
//         return state.userInformation[userId].information;
//       }
//       return '';
//     },
//     getUpdateHistory: state => {
//       const userId = state.currentUser;
//       if (userId && state.userInformation[userId]) {
//         return state.userInformation[userId].updateHistory;
//       }
//       return [];
//     },
//   },
// });

// export default store;







// store.js

import { createStore } from 'vuex';

const store = createStore({
  state: {
    information: '',
    updateHistory: JSON.parse(localStorage.getItem('updateHistory')) || [],
 
    updateHistoryChanged: false // 标志，表示更新历史是否发生变化
  },
  mutations: {
    updateInformation(state, payload) {
      state.information = payload;
      state.updateHistory.push(payload); // 将更新记录添加到数组中
      state.updateHistoryChanged = true;
      localStorage.setItem('updateHistory', JSON.stringify(state.updateHistory)); // 将更新历史保存到localStorage
 
    },
    clearUpdateHistoryChanged(state) {
      state.updateHistoryChanged = false; // 重置更新历史变化标志
    }
  },
  actions: {
    async setInformation({ commit }, payload) {
      commit('updateInformation', payload);
      return 'Information updated successfully';
    },
    clearUpdateHistoryChanged({ commit }) {
      commit('clearUpdateHistoryChanged');
    }
  },
  getters: {
    getInformation: state => state.information,
    getUpdateHistory: state => state.updateHistory, // 获取更新记录数组的 getter
    isUpdateHistoryChanged: state => state.updateHistoryChanged // 获取更新历史变化标志的 getter
 
  }
});

export default store;








// import { createStore } from 'vuex';

// const store = createStore({
//   state: {
//     // 在這裡定義你的初始狀態
//     information: '123'
//   },
//   mutations: {
//     // 定義mutations，用於更新狀態
//     updateInformation(state, payload) {
//       state.information = payload;
      
//     }
//   },
//   actions: {
//     // 定義actions，用於呼叫mutations進行狀態更新
//     async setInformation({ commit }, payload) {
//       commit('updateInformation', payload);
//       return payload; 
//     }
//   },
//   getters: {
//     // 定義getters，用於獲取狀態
//     getInformation: state => state.information
    
//   }
// });

// export default store;




// import { createStore } from 'vuex';

// const store = createStore({
//   state() {
//     return {
//       updatedInfo: null,
//     };
//   },
//   mutations: {
//     updateInfo(state, info) {
//       state.updatedInfo = info;
//     },
//   },
//   actions: {
//     setUpdatedInfo({ commit }, info) {
//       commit('updateInfo', info);
//     },
//   },
// });

// export default store;





// store.js

// import { createStore } from 'vuex';

// const store = createStore({
//   state: {
//     updatedFields: {}, // Object to store updated fields and their content
//   },
//   mutations: {
//     addUpdatedField(state, payload) {
//       state.updatedFields[payload.field] = payload.content;
//     },
//     clearUpdatedFields(state) {
//       state.updatedFields = {};
//     },
//   },
//   actions: {
//     addUpdatedField({ commit }, payload) {
//       commit('addUpdatedField', payload);
//     },
//     clearUpdatedFields({ commit }) {
//       commit('clearUpdatedFields');
//     },
//   },
//   getters: {
//     getUpdatedFields: state => state.updatedFields,
//   },
// });

// export default store;