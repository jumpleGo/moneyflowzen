<template>
  <div class="detail-information-page">
    <div class="detail-information-page__light" />
    <div class="detail-information-page__header">
      <h1 v-if="detailData && detailData?.title" class="detail-information-page__title">
        {{ detailData.title }}
        <img class="detail-information-page__image" :src="detailData.image" />
      </h1>
      <h1 v-else class="detail-information-page__title--sceleton" />
      <div class="detail-information-page__moln-wrapper">
        <img class="detail-information-page__moln" src="../assets/molnBig.svg">
        <img class="detail-information-page__coins" src="../assets/coins.png">
      </div>
    </div>
    <div v-if="detailData?.description" class="detail-information-page__content">
      <div class="detail-information-page__text" v-html="detailData.description" />
    </div>
    <div v-else class="detail-information-page__content--sceleton" />
    <div class="call-to-action">
      <img class="call-to-action__ball" src="../assets/bsll.svg" />
      <img class="call-to-action__ball-2" src="../assets/bsll.svg" />
      <img class="call-to-action__ball-3" src="../assets/bsll.svg" />
      <img class="call-to-action__ball-4" src="../assets/bsll.svg" />
      <img class="call-to-action__moln" src="../assets/moln.svg" />
      <img class="call-to-action__dollar" src="../assets/dollar_big.svg" />
      <img class="call-to-action__guru" src="../assets/guru.png" />
      <div class="call-to-action__wrapper">
        <div class="call-to-action__light" />
        <AppButton title="стать гуру" class="call-to-action__button" to="https://t.me/rrotatew" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";
import {useDetailInfoStore} from "@/stores/detail";
import AppButton from "@/components/Buttons/AppButton.vue";
import {computed, onMounted, ref} from "vue";
import {storeToRefs} from "pinia";

const router = useRouter()
const detailStore = storeToRefs(useDetailInfoStore())

const route = useRoute()

const detailData = computed(() => {
  return detailStore.products.value.find(item => item.link === route.path.replace('/', ''))

})

</script>

<style lang="scss" scoped>
.detail-information-page__light {
  position: absolute;
  display: block;
  width: 1px;
  height: 1px;
  top: 50%;
  left: -30%;
  box-shadow: 0px 0px 800px 200px $brand_yellow;
}
.detail-information-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 90px;
  overflow: hidden;
  height: 100%;
  padding-bottom: 180px;

  @include tablet {
    padding-top: 120px;
  }

  @include desktop {
    padding-top: 170px;
  }
  @include desktop-lg {
    padding-top: 170px;
  }
}
.detail-information-page__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px;
}
.detail-information-page__title {
  text-transform: uppercase;
  text-align: center;
  font-weight: 700;
  width: fit-content;
  color: $brand_yellow;
  position: relative;

  @include mobile-xs {
    font-size: 40px;
  }

  @include mobile {
    font-size: 50px;
  }

  @include tablet {
    font-size: 60px;
  }

  @include desktop {
    font-size: 80px;
  }

  @include desktop-lg {
    font-size: 80px;
  }
}

.detail-information-page__title--sceleton {
  width: 50vw;
  background: white;
  opacity: 0.5;
  animation: lighting 4s linear infinite;
  @include mobile-xs {
    height: 40px;
  }

  @include mobile {
    height: 50px;
  }

  @include tablet {
    height: 60px;
  }

  @include desktop {
    height: 80px;
  }

  @include desktop-lg {
    height: 80px;
  }
}
.detail-information-page__image {
  position: absolute;
  transform: rotate(20deg);
  box-shadow: 0px 0px 90px 20px $brand_yellow;
  border-radius: 50%;
  z-index: 4;

  @include mobile-xs {
    width: 40px;
    bottom: 0px;
  }

  @include mobile {
    width: 50px;
    right: -40px;
    bottom: 0px;
  }

  @include tablet {
    width: 50px;
    right: -40px;
    bottom: 0px;
  }

  @include desktop {
    width: 70px;
    right: -40px;
    bottom: 0px;
  }

  @include desktop-lg {
    width: 70px;
    right: -40px;
    bottom: 0px;
  }
}
.detail-information-page__moln-wrapper {
  position: relative;
  width: 100%;

  @include desktop {
    margin-top: 40px;
  }

  @include desktop-md {
    margin-top: 160px;
  }

  @include desktop-lg {
    margin-top: 400px;
  }
}
.detail-information-page__moln {
  position: absolute;
  bottom: -150px;
  right: -10%;
  width: 100%;

  @include mobile-xs {
    bottom: -120px;
  }
}

.detail-information-page__coins {
  position: absolute;
  width: 300px;

  @include mobile-xs {
    width: 200px;
    left: -17vw;
    bottom: -190px;
  }

  @include mobile {
    width: 300px;
    left: -100px;
    bottom: -250px;
  }

  @include tablet {
    width: 300px;
    left: -100px;
    bottom: -250px;
  }

  @include desktop {
    width: 300px;
    left: -50px;
    bottom: -250px;
  }

  @include desktop-md {
    width: 500px;
    left: -50px;
    bottom: -300px;
  }

  @include desktop-lg {
    width: 500px;
    left: -50px;
    bottom: -300px;
  }
}
.detail-information-page__content {
  margin-top: 200px;
  padding: 0 20px;
  display: flex;
  justify-content: center;
}
.detail-information-page__content--sceleton {
  margin: 0 auto;
  padding: 0 20px;
  width: 50vw;
  height: 300px;
  background: white;
  opacity: 0.5;
  animation: lighting 4s linear infinite;

}
.detail-information-page__text {
  padding: 20px;
  font-size: 14px;
  color: white;
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 11px 0 rgba(0, 0, 0, 0.44);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  max-width: 1200px;
  z-index: 2;

  @include tablet {
    font-size: 18px;
  }
  @include desktop {
    font-size: 20px;
  }

  @include desktop-lg {
    font-size: 22px;
  }
}
.call-to-action__wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  border-radius: 50%;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  height: 350px;
  margin-top: 60px;
  box-shadow: 0 4px 11px 0 rgba(0, 0, 0, 0.44);
  z-index: 3;

  @include tablet {
    width: 550px;
    height: 550px;
  }

  @include desktop {
    width: 700px;
    height: 700px;
    margin-top: 120px;
  }

  @include desktop-lg {
    width: 700px;
    height: 700px;
    margin-top: 120px;
  }
}
.call-to-action {
  padding: 0 20px;
  position: relative;
  display: flex;
  justify-content: center;
}
.call-to-action__ball {
  position: absolute;
  width: 20%;
  right: 13%;
  top: 10%;
  z-index: 2;

  @include desktop-lg {
    width: 5%;
    right: 35%;
    top: 20%;
  }
}
.call-to-action__ball-2 {
  position: absolute;
  width: 15%;
  left: 5%;
  top: 25%;

  @include desktop-lg {
    width: 10%;
    left: 30%;
  }
}

.call-to-action__ball-3 {
  position: absolute;
  width: 10%;
  bottom: 5%;
  left: 15%;

  @include desktop-lg {
    width: 5%;
    left: 35%
  }
}

.call-to-action__ball-4 {
  position: absolute;
  width: 10%;
  bottom: 5%;
  right: 15%
}

.call-to-action__moln {
  position: absolute;
  width: 30%;
  top: 40%;
  right: 0;

  @include desktop-lg {
    width: 20%;
    right: 20%;
  }
}

.call-to-action__dollar {
  position: absolute;
  width: 45%;
  right: 15%;
  top: -15%;
  z-index: 1;

  @include desktop-lg {
    width: 20%;
    right: 30%;
  }
}

.call-to-action__guru {
  position: absolute;
  width: 40%;
  right: auto;
  left: auto;
  bottom: -80px;
  z-index: 4;

  @include tablet {
    width: 30%;
  }

  @include desktop {
    width: 20%;
  }

  @include desktop-lg {
    width: 10%;
  }
}
.call-to-action__light {
  position: absolute;
  display: block;
  width: 1px;
  height: 1px;
  box-shadow: 0px 0px 400px 50px $brand_yellow;
  z-index: 1;
}
.call-to-action__button {
  z-index: 3;
}
</style>