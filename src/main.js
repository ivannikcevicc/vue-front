import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import VueGoogleMaps from "@fawmi/vue-google-maps";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(VueGoogleMaps, {
  load: {
    //https://www.youtube.com/watch?v=iFOEU6YNBzw 2:13:33
    key: "AIzaSyCAqdwRPpTtDGc6lWZKlSO0EPgkAKRo-8o",
    libraries: "places",
  },
});

app.mount("#app");
