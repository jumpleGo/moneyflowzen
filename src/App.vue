<template>
  <div class="mfz_wrapper">
    <AppHeader :show-test="showTest" />
    <RouterView />
    <AppFooter />
    <AppPopup v-if="showModal" />
  </div>
</template>
<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import AppFooter from './components/AppFooter.vue'
import { computed, onMounted } from 'vue'
import {useDetailInfoStore} from "@/stores/detail";
import {getCurrentInstance} from "vue";
import {ref as dbRef} from "@firebase/database";
import {getDatabase} from "firebase/database";
import {storeToRefs} from "pinia";
import { Getter } from '@/helpers/getter'
import { useMainStore } from '@/stores/main'
import { makeId } from '@/helpers/generator'
import { Setter } from '@/helpers/setter'
import AppHeader from '@/components/AppHeader.vue'
import AppPopup from '@/components/AppPopup.vue'


const instance = getCurrentInstance()

const firebase = instance?.appContext.config.globalProperties.$firebase
const databaseRef = dbRef(getDatabase(firebase));
const {products, tariffs} = storeToRefs(useDetailInfoStore())
const {hash, activeHashes, showModal, existsGift, showModalType} = storeToRefs(useMainStore())

let telegramApp = window.Telegram.WebApp

const route = useRoute()
console.log(route)
const showTest = computed(() => route.path !== '/guide')

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

  await getActiveHashes()

  await checkForGetGift()
  if (existsGift.value) {
    showModal.value = true
    showModalType.value = 'GiftPopup'
  }

  await getProducts()
  await getTariffs()
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
  console.log(giftHash)
  try {
    await Setter.setToDb(databaseRef, `/activeHash/${activeHashes.value?.length || 0}`, giftHash)
  }catch (err) {
    return err
  }

  window.localStorage.setItem('giftHash', giftHash)
  await getActiveHashes()

}

const getGiftCreateHash = async () => {
  hash.value = await Getter.getFromDB(databaseRef, 'giftCreateHash/')
}

const getActiveHashes = async () => {
  activeHashes.value = await Getter.getFromDB(databaseRef,'activeHash/')
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
