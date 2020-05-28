import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import VueCountdown from "@chenfengyuan/vue-countdown";
import whimClientVue from "whim-client-vue";

Vue.component(VueCountdown.name, VueCountdown);

Vue.config.productionTip = false;

import "./assets/sass/style.scss";

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

Vue.use(Vuex);
const store = new Vuex.Store();

Vue.config.productionTip = false;
Vue.use(whimClientVue, { store });

const NG_WORD_PATTERNS = require("@/assets/ng_word_patterns.json");

Vue.prototype.$gameStart = () => {
  const shuffledPattern = shuffle(
    NG_WORD_PATTERNS[Math.floor(Math.random() * NG_WORD_PATTERNS.length)]
  );
  let ngWords = {};
  Vue.prototype.$whim.users.forEach((user, i) => {
    ngWords[user.id] = shuffledPattern[i];
  });
  Vue.prototype.$whim.assignState({
    phase: "shuffling",
    ngWords: ngWords
  });
};
Vue.prototype.$gameVote = ({ from, to }) => {
  let votes = Vue.prototype.$whim.state.votes || [];
  votes.push({ from, to });
  Vue.prototype.$whim.assignState({
    votes: votes
  });
};

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
