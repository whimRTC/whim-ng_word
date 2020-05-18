import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueCountdown from "@chenfengyuan/vue-countdown";

Vue.component(VueCountdown.name, VueCountdown);

Vue.config.productionTip = false;

import "./assets/sass/style.scss";

// wh.imから room / users情報が送られてきたら登録
window.addEventListener(
  "message",
  event => {
    if (event.data.room) {
      console.log("room: " + event.data.room);
      store.commit("setRoom", event.data.room);
    }
    if (event.data.accessUserId) {
      console.log("accessUserId: " + event.data.accessUserId);
      store.commit("setAccessUserId", event.data.accessUserId);
    }
    if (event.data.users) {
      console.log("user: " + event.data.users);
      store.commit("setUsers", event.data.users);
    }
  },
  false
);

// wh.im本体との通信を開始
window.parent.postMessage("connect", document.referrer);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
