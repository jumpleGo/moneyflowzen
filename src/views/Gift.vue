<template>
  <div class="mfz-gift">
    <WelcomeGiftPage v-if="!showGame" @openGame="showGame = true"/>
    <GiftGamePage v-else  />
  </div>

</template>
<script setup lang="ts">
import WelcomeGiftPage from "@/components/WelcomeGiftPage.vue";
import GiftGamePage from "@/components/GiftGamePage.vue";
import {shallowRef} from "vue";

const showGame = shallowRef<boolean>(false)


</script>
<style lang="scss" scoped>
.mfz-gift {
  padding-top: 100px;
  min-height: 100vh;
  overflow: hidden;
}
</style>