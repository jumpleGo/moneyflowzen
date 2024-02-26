<template>
  <div class="mfz_welcome-test">
    <p class="mfz_welcome-test--text">вселенная mfz</p>
    <img src="../assets/saturn.png" class="mfz_welcome-test--saturn" />
    <img src="../assets/light.svg" class="mfz_welcome-test--light" />
    <img src="../assets/levelBadge.png" class="mfz_welcome-test--level-badge badge" />
    <img src="../assets/testBadge.png" class="mfz_welcome-test--test-badge badge" />
    <img src="../assets/doBadge.png" class="mfz_welcome-test--do-badge badge" />
    <img src="../assets/logo.png" class="mfz_welcome-logo logo badge" />
    <img src="../assets/coins.png" class="mfz_welcome-test--coins" />
    <h1 class="mfz_welcome-test--title">проверка<br/>знаний</h1>
    <app-button title="пройти тест" class="mfz_welcome-test--button" @click="emit('openTest')" />
  </div>
</template>
<script lang="ts" setup>
import AppButton from "@/components/Buttons/AppButton.vue";

const emit = defineEmits<{
  (e: 'openTest')
}>()
</script>
<style lang="scss" scoped>
.mfz_welcome-test {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  height: 100%;
  position: relative;
}
.mfz_welcome-test--light {
  position: absolute;
  margin: 0 auto;
  width: 800px;
  height: auto;
}
.mfz_welcome-test--text {
  text-transform: uppercase;
  color: $brand_yellow;
  font-weight: 600;
}
.mfz_welcome-test--saturn {
  margin-top: 8vh;
}
.mfz_welcome-test--title {
  font-weight: 600;
  font-size: 50px;
  text-align: center;
  text-transform: uppercase;
  color: white;
  margin-top: 8vh;

}
.mfz_welcome-test--button {
  margin-top: 16vh;
  z-index: 2;
}

.badge {
  position: absolute;
}
.mfz_welcome-test--level-badge {
  margin-top: 50%;
  margin-left: 50%;
}
.mfz_welcome-test--test-badge {
  margin-left: 70%;
  margin-bottom: 10%;
}
.mfz_welcome-test--do-badge {
  margin-right: 50%;
  margin-bottom: 20%;
}
.mfz_welcome-test--coins {
  position: absolute;
  width: 40%;
  bottom: 0;
  margin-bottom: -100px;
  margin-left: 30%;
}
.mfz_welcome-logo {
  width: 50px;
  transform: rotate(-25deg);
  left: 5%;
  margin-top: 25%
}
</style>
