import Vue from "vue";
import Vuex from "vuex";
import whimClientVue from "whim-client-vue";

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

const ngWordPatterns = require("@/assets/ng_word_patterns.json");

Vue.prototype.$gameStart = () => {
  const ngWordPattern = shuffle(
    ngWordPatterns[Math.floor(Math.random() * ngWordPatterns.length)]
  );
  let ngWord = {};
  Vue.prototype.$whim.users.forEach((user, i) => {
    ngWord[user.id] = ngWordPattern[i];
  });
  Vue.prototype.$whim.assignState({
    phase: "shuffling",
    ngWord: ngWord
  });
};
Vue.prototype.$gameVote = ({ from, to }) => {
  let votes = Vue.prototype.$whim.state.votes || [];
  votes.push({ from, to });
  Vue.prototype.$whim.assignState({
    votes: votes
  });
};

export default store;
