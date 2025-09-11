import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index.js";
import router from "./routes.js";
import VueSmoothScroll from "vue3-smooth-scroll";
import CoolLightBox from "vue-cool-lightbox";
import Toast from "vue-toastification";
import Vue3Signature from "vue3-signature";
import vuetify from './plugins/vuetify';
import "vue-toastification/dist/index.css";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
import "@vuepic/vue-datepicker/dist/main.css";
import { mask } from 'vue-the-mask';
import './interceptor.js'

const app = createApp(App);
app.use(vuetify);
app.use(VueSmoothScroll);
app.use(Toast);
app.use(router);
app.use(CoolLightBox);
app.use(Vue3Signature);
app.use(store);
app.directive('mask', mask);
app.mount("#app");
// createApp(App).use(router, VueSmoothScroll).mount('#app')
