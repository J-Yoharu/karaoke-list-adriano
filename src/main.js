import Vue from "vue";
import App from "@/App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery";
import vuetify from "./plugins/vuetify";
import router from "./router";
import axios from "axios";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  vuetify,
  router,

  beforeMount: function () {
    console.log("Bem vindo à lista de músicas do Augusto!!!");
  },
}).$mount("#app");
