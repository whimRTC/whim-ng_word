import Vue from "vue";
import App from "./App.vue";
import VueCountdown from "@chenfengyuan/vue-countdown";
import whimClientVue from "whim-client-vue";
import "whim-client-vue/dist/whim-client-vue.css";

Vue.component(VueCountdown.name, VueCountdown);

Vue.config.productionTip = false;

import "./assets/sass/style.scss";

Vue.config.productionTip = false;

// 通常はこれだけでよい
// Vue.use(whimClientVue);

// wh.imの開発時に用いるの設定
let targetOrigin;
if (window.location.search === "?env=dev") {
  targetOrigin = "https://localhost:3000";
} else if (window.location.search === "?env=stg") {
  targetOrigin = "https://stg.wh.im";
} else {
  targetOrigin = "https://wh.im";
}
Vue.use(whimClientVue, { targetOrigin });

new Vue({
  render: h => h(App)
}).$mount("#app");
