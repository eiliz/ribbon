import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  strict: process.env.NODE_ENV !== "production",
  state,
  mutations,
  actions,
  getters,
  modules: {}
});
