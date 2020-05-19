import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const topics = require("@/assets/topics.json");

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
    start({ state }, genre) {
      let appState = state.room.appState || {};
      appState.genre = genre;
      appState.phase = "shuffling";

      // topicの選択
      let targetTopics;
      if (genre === "random") {
        targetTopics = topics;
      } else {
        targetTopics = topics.filter(topic => topic.genre === genre);
      }
      const topic =
        targetTopics[Math.floor(Math.random() * targetTopics.length)];

      let majority, minority;
      if (topic.group) {
        const selected = topic.group
          .sort(() => 0.5 - Math.random())
          .slice(0, 2);
        majority = selected[0];
        minority = selected[1];
      } else if (topic.majority && topic.minority) {
        majority = topic.majority;
        minority = topic.minority;
      } else {
        console.error("invalid json");
      }
      let userTopic = {};
      state.users.map(user => {
        userTopic[user.id] = majority;
      });
      const minorityUserId =
        state.users[Math.floor(Math.random() * state.users.length)].id;
      userTopic[minorityUserId] = minority;
      appState.userTopic = userTopic;
      appState.minorityUserId = minorityUserId;
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
