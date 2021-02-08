import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import PortalVue from "portal-vue";
import "@/plugins/listingsApiPlugin";
import "@/assets/css/main.css";

import { registerBaseComponents } from "@/helpers/registerBaseComponents";
registerBaseComponents(Vue);

Vue.use(PortalVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
