import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/*webpackChunkName: 'Home'*/ "../views/Home.vue"),
  },
  {
    path: "/favorites",
    name: "favorites",
    component: () =>
      import(/*webpackChunkName: 'Home'*/ "../views/Favorite.vue"),
  },
  {
    path: "*",
    name: "error",
    component: () => import("../views/Error.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
