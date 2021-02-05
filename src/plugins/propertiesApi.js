import Vue from "vue";
import propertiesApi from "@/api/propertiesApi";

const propertiesApiPlugin = {
  install(Vue) {
    Object.defineProperty(Vue.prototype, "$propertiesApi", {
      value: propertiesApi
    });
  }
};

Vue.use(propertiesApiPlugin);
