import Vue from "vue";
import App from "./App.vue";

import "./styles/";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

// LOADING

// https://github.com/noxludio/vuejs-loading-plugin
