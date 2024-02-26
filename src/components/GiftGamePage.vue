<template>
<div class="mfz-gift-game">
  <img src="../assets/borderCoins.png" class="mfz_welcome-gift--coins" />
  <div class="mfz-gift-game__content">
    <img v-for="index in 9" :key="index" src="../assets/gift.png" class="mfz-gift-game__item" />
  </div>
</div>
</template>
<style lang="scss" scoped>
.mfz-gift-game {
  position: relative;
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  align-items: center;

}
.mfz_welcome-gift--coins {
  position: absolute;
  bottom: 0;
  right: 0;
}

.mfz-gift-game__content {
  display: flex;
  flex-wrap: wrap;
  margin-top: -150px;
  width: 100%;
  gap: 16px;
  padding: 30px;
}
.mfz-gift-game__item {
  width: 30%;
}
</style>