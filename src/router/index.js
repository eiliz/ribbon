import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../layouts/Main.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    component: Main,
    children: [
      {
        path: "/",
        name: "home",
        component: Home
      },
      {
        path: "/listing/:id",
        name: "single-listing",
        component: () =>
          import(
            /* webpackChunkName: "single-listing" */ "../views/SingleListing.vue"
          )
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
