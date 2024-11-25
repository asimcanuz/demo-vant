import { Button, Tab, Tabs } from "vant";
import "vant/lib/index.css";
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Tab);
Vue.use(Tabs);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
