<template>
  <div class="mfz-test">
    <TestPage v-if="showTest" />
    <WelcomeTestPage v-else @openTest="showTest = true" />
  </div>
</template>
<script lang="ts" setup>
import WelcomeTestPage from "@/components/WelcomeTestPage.vue";
import {shallowRef} from "vue";
import TestPage from "@/components/TestPage.vue";

const showTest = shallowRef<boolean>(false)
</script>
<style lang="scss" scoped>
.mfz-test {
  padding-top: 100px;
  min-height: 100vh;
  overflow: hidden;
}
</style>