import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const ngWordPatterns = require("@/assets/ng_word_patterns.json");

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const store = new Vuex.Store({
  state: {
    room: {}, // room information
    users: [], // information of users in the room
    accessUserId: null, // information of user who play in this window
    appState: {}
  },
  mutations: {
    setRoom(state, room) {
      state.room = room;
      state.appState = room.appState || {};
    },
    setUsers(state, users) {
      console.log(users);
      state.users = users;
    },
    setAccessUserId(state, userId) {
      state.accessUserId = userId;
    },
    setAppState(state, appState) {
      state.appState = appState;
    }
  },
  actions: {
    appState({ state }, obj) {
      let appState = state.appState;
      Object.keys(obj).forEach(key => {
        appState[key] = obj[key];
      });
      postAppState(appState);
    },
    resetAppState() {
      postAppState({});
    },
    // put original actions here
    start({ state }) {
      const ngWordPattern = shuffle(
        ngWordPatterns[Math.floor(Math.random() * ngWordPatterns.length)]
      );
      let ngWord = {};
      state.users.forEach(function(user, i) {
        ngWord[user.id] = ngWordPattern[i];
      });

      let appState = state.appState;
      appState.phase = "shuffling";
      appState.ngWord = ngWord;
      postAppState(appState);
    },
    phase({ dispatch }, phase) {
      dispatch("appState", { phase });
    },
    vote({ state }, { from, to }) {
      let appState = state.appState;
      appState.votes = appState.votes || [];
      appState.votes.push({ from, to });
      postAppState(appState);
    }
  },
  getters: {
    accessUser: state => {
      return state.users.find(user => user.id === state.accessUserId);
    },
    phase: state => {
      return state.appState.phase;
    }
    // put original getters here
  }
});

// appStateの更新、clinet & server
// It will be called from actions
const postAppState = appState => {
  store.commit("setAppState", appState);
  window.parent.postMessage({ appState }, document.referrer);
};

export default store;
