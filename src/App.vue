<template>
  <div class="mfz_wrapper">
    <header class="mfz_wrapper__header">
      <img class="mfz_wrapper__header--logo logo" src="./assets/logo.png">
      <nav class="mfz_wrapper__header_navbar">
        <router-link class="mfz_wrapper__header_navbar--link" to="/">
          главная
        </router-link>
        <router-link class="mfz_wrapper__header_navbar--link deactive" to="/test">
          проверка знаний
        </router-link>
        <router-link class="mfz_wrapper__header_navbar--link" to="/products">
          продукты
        </router-link>

      </nav>
    </header>
    <RouterView />
    <AppFooter />
  </div>
</template>
<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import AppFooter from './components/AppFooter.vue'
import {nextTick, onMounted} from "vue";
import {useDetailInfoStore} from "@/stores/detail";
import {getCurrentInstance} from "vue";
import {ref as dbRef} from "@firebase/database";
import {child, get, getDatabase} from "firebase/database";
import {storeToRefs} from "pinia";
import { Getter } from '@/helpers/getter'
import { useMainStore } from '@/stores/main'
import { makeId } from '@/helpers/generator'
import { Setter } from '@/helpers/setter'

const instance = getCurrentInstance()

const firebase = instance?.appContext.config.globalProperties.$firebase
const databaseRef = dbRef(getDatabase(firebase));
const {products, tariffs} = storeToRefs(useDetailInfoStore())
const {hash} = storeToRefs(useMainStore())

let telegramApp = window.Telegram.WebApp

const route = useRoute()

onMounted(async () => {
  telegramApp.expand();
  telegramApp.SettingsButton.hide()
  telegramApp.setHeaderColor('#F0BD45')
  telegramApp.MainButton.setParams({
    color: "#F0BD45",
    is_visible: true,
    text_color: '#010101',
    text: 'Оформить'
  });

  await checkForGetGift()

  await getProducts()
  await getTariffs()

  const activeHashes: string[] = await Getter.getFromDB(databaseRef,'activeHash/')
console.log(activeHashes)

})

const checkForGetGift = async () => {
  console.log(route)
  if (route.query.getGift) {
    await getGiftCreateHash()
  } else return

  if (route.query?.getGift === hash.value) {
    await generateGiftChance()
  }
}

const generateGiftChance = async () => {
  const giftHash = makeId(5)
  const activeHashes: string[] = await Getter.getFromDB(databaseRef,'activeHash/')
  try {
    await Setter.setToDb(databaseRef, `/activeHash/${activeHashes?.length || 0}`, giftHash)
  }catch (err) {
    return err
  }

  window.localStorage.setItem('giftHash', giftHash)

}

const getGiftCreateHash = async () => {
  hash.value = await Getter.getFromDB(databaseRef, 'giftCreateHash/')
}

const getProducts = async () => {
  products.value = await Getter.getFromDB(databaseRef, 'products/')
}
const getTariffs = async () => {
  tariffs.value = await Getter.getFromDB(databaseRef, 'tariffs/')
}

window.Telegram.WebApp.onEvent('mainButtonClicked', () => {
  window.Telegram.WebApp.sendData(JSON.stringify({
    eventData: {
      cost: 200
    }
  }))
})

</script>
<style lang="scss" scoped>
.mfz_wrapper {
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.mfz_wrapper__footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  flex: 1;
}
.mfz_wrapper__header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  z-index: 2;
  background: transparent;

  @include mobile {
    padding: 30px 15px;
    width: 100%;
  }

  @include mobile-xs {
    padding: 30px 15px;
    width: 100%;
  }

  @include tablet {
    padding: 30px 15px;
    width: 100%;
  }

  @include desktop {
    padding: 32px 40px;
  }

  @include desktop-lg {
    padding: 32px 40px;
  }
}
.mfz_wrapper__header--logo {
  @include mobile {
    display: none;
  }

  @include mobile-xs {
    display: none;
  }

  @include tablet {
    width: 60px;
  }

  @include desktop {
    width: 80px;
  }

  @include desktop-lg {
    width: 120px;
  }

}
.mfz_wrapper__header_navbar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  z-index: 10;
}

.mfz_wrapper__header_navbar--link {

  font-weight: 600;
  border-bottom: 2px solid transparent;
  color: white;
  text-transform: uppercase;

  @include mobile {
    font-size: 14px;
  }

  @include mobile-xs {
    font-size: 12px;
  }
  @include tablet {
    font-size: 18px;
  }

  @include desktop {
    font-size: 22px;
  }

  @include desktop-lg {
    font-size: 24px;
  }

  &:hover {
    border-bottom-color: $brand_yellow;
    background: transparent;

  }
}
.deactive {
  pointer-events: none;
  position: relative;
  opacity: 0.5;
  &:after {
    content: '';
    position: absolute;
    display: block;
    top: -5px;
    right: -10px;
    width: 15px;
    height: 15px;
    background-image: url("./assets/clock.png");
    background-size: cover;
  }
}
</style>

<style lang="scss">
body {
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: flex-start;
  overflow-x: hidden;
  background: black;
  background-image: url("./assets/dotBG.svg");
  font-family: 'Montserrat', sans-serif;
}
#app {
  display: flex;
  height: 100%;
  width: 100vw;
  max-width: unset;
  padding: unset;
}
.router-link-active {
  border-bottom-color: $brand_yellow !important;
}
</style>
