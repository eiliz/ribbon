import Vue from "vue";
import listingsApi from "@/api/listingsApi";

const listingsApiPlugin = {
  install(Vue) {
    Object.defineProperty(Vue.prototype, "$listingsApi", {
      value: listingsApi
    });
  }
};

Vue.use(listingsApiPlugin);
