import './assets/main.css'

import {createApp} from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { initializeApp } from "firebase/app";



const firebaseConfig = {
    databaseURL: "https://moneyflowzen-default-rtdb.firebaseio.com/",
};

const firebase = initializeApp(firebaseConfig);

const app = createApp(App)
app.config.globalProperties.$firebase = firebase

app.use(createPinia())
app.use(router)


app.mount('#app')
