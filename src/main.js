import Vue from "vue";
import App from "./App.vue";
import VueCountdown from "@chenfengyuan/vue-countdown";
import whimClientVue from "whim-client-vue";
import "whim-client-vue/dist/whim-client-vue.css";

Vue.component(VueCountdown.name, VueCountdown);

Vue.config.productionTip = false;

import "./assets/sass/style.scss";

Vue.config.productionTip = false;
Vue.use(whimClientVue, { environment: "staging" });

new Vue({
  render: h => h(App)
}).$mount("#app");
