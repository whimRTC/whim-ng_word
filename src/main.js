import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueCountdown from "@chenfengyuan/vue-countdown";

Vue.component(VueCountdown.name, VueCountdown);

Vue.config.productionTip = false;

import "./assets/sass/style.scss";

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
