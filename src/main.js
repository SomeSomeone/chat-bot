import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import theme from "@/plugins/theme";
import VueTypedJs from "vue-typed-js";

Vue.config.productionTip = false;
Vue.use(VueTypedJs);
Vue.use(theme);
new Vue({
  vuetify,
  theme,
  render: (h) => h(App),
}).$mount("#app");
