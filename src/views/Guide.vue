<template>
  <div class="smart-info">
    <div v-if="rocketClicked" class="more-info">
      <img class="more-info__image" src="../assets/arrow_yellow.png" alt="">
      <span>смотри что есть!</span>
    </div>
    <div :class="['blur', {'show-blur': counter && counter < 15}]"></div>
    <div :class="['badge free', {'droppedFree': isClicked}, {'show': showBadges}]">Бесплатно!</div>
    <div :class="['badge', 'forStart', {'show': showBadges}, {'droppedStart': isClicked}]">Для начинающих</div>
    <div :class="['badge', 'best', {'show': showBadges}, {'dropBest': isClicked}]">лучший гайд</div>
    <div :class="['badge',  'anim1 info', {'show': showBadges}]">куча инфы</div>
    <div :class="['badge anim1 where',{'show': showBadges}, {'droppedWhere': isClicked}]">где?</div>
    <div :class="['badge', 'anim2', 'guide', {'show': showBadges}]">гайд??</div>
    <div v-if="showClicker && !counter" :class="['clicker']" @click="listenerOn">кликни сюда!</div>
    <div :class="['smart-info__title-wrapper']">
      <h1 v-show="counter && counter < 15" class="smart-info--title__additional">кликай и получи</h1>
      <h1 :class="['smart-info--title', {'without_line': counter}]">бесплатный гайд</h1>
      <h1 v-if="rocketClicked" class="smart-info--yours">уже у тебя!</h1>
      <div v-if="counter === 15 && !rocketClicked"  class="counter__rocket">жми на ракету!</div>

    </div>
    <div v-if="counter" :class="['counter', {'showCounter': counter}]">
      <div v-if="counter < 15" class="counter__count counter__count--count">{{counter}}</div>
      <div v-if="counter < 15" class="counter__count">/15</div>
       </div>

      <img v-if="counter === 15"  src="../assets/rocket.png" :class="['link_image', {'link_image_up': rocketClicked }]" @click="download"/>

  </div>
</template>
<script lang="ts" setup>
import { ref, shallowRef, watch } from 'vue'

const isClicked = shallowRef<boolean>(false)
const showClicker = shallowRef<boolean>(false)
const showRocket = shallowRef<boolean>(true)
const rocketClicked = shallowRef<boolean>(false)
const showBadges = shallowRef(false)
const counter = shallowRef(0)

setTimeout(() => showBadges.value = true, 4000)
setTimeout(() => isClicked.value = true, 4000)
setTimeout(() => {
  showClicker.value = true;

}, 7000)

const listenerOn = () => {
  showBadges.value = false
  window.addEventListener('click', clickHandler)
  window.addEventListener('touchstart', clickHandler)
}
const clickHandler = (event) => {
  console.log(event)
  const clientX = event.clientX || event.touches[0].clientX
  const clientY = event.clientY || event.touches[0].clientY

  const one = document.createElement('span')
  one.classList.add('one')
  one.appendChild(document.createTextNode('1'))
  one.style.cssText = `position:absolute;left:${clientX}px;top:${clientY}px`

  counter.value+=1
  document.body.appendChild(one)
  setTimeout(() => {
    document.body.removeChild(one)
  }, 2000)

}
watch(() => counter.value, (value) => {
  if (value === 15) {
    removeEventListener('click', clickHandler)
    removeEventListener('touchstart', clickHandler)
  }
})

const download = () => {
  showRocket.value = false
  rocketClicked.value = true
  downloadPDF()
}

const downloadPDF = () => {
  
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://moneyflowzen.ru/guide_money_flow_zen.pdf', true);
  xhr.responseType = 'blob';
  xhr.onload = function() {
    console.log(xhr)
    if (xhr.status === 200) {
      var blob = xhr.response;
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'путь в трейдинг'; // Задайте имя файла, какое вы хотите
      link.click();
    }
  };
  xhr.send();
}

</script>
<style lang="scss" scoped>
.blur {
  width: 10000%;
  height: 10000%;
  position: fixed;
  left: 0;
  top: 0;
  transition: 0.4s;
  //box-shadow: 0px 0px 3500px 2000px $brand_yellow;
  opacity: 0;
  background: $brand_yellow;
  z-index: -1;

  &:hover {
    cursor: pointer;
  }
}
.show-blur {
  opacity: 0.5;
  z-index: 100;
  touch-action: manipulation;
  -ms-touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;

}
.smart-info {
  user-select: none;
  touch-action: manipulation;
  cursor: default;

  min-height: 100vh;
  overflow: hidden;
  position: relative;
  @include mobile {
    padding-top: unset;
  }
}
.smart-info__title-wrapper {
  height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  animation: dropText 4s linear;
  transition: 0.5s;
  @include mobile-all {
    height: 100vh;
  }

}

.without_line {
  transition: 0.5s;
  &:before {
    opacity: 0;

  }
}

.smart-info--title, .smart-info--title__additional {
  font-weight: 800;
  font-size: 70px;
  text-align: center;
  text-transform: uppercase;
  color: $brand_yellow;
  z-index: 2;
  position: relative;
  text-shadow: 0px 0px 100px $brand_yellow;
  transition: 0.5s;


  @include mobile-all {
    font-size: 40px;
  }
}
.smart-info--title {
  position: relative;
  &:before {
    content: '';
    position: absolute;

    transform: translate(25rem, -96vh);
    height: 100vh;
    width: 2px;
    background: $brand_yellow;

    @include mobile-xs {
      transform: translate(13rem, -98.5vh);
      margin-left: -25px;
    }
    @include mobile {
      transform: translate(14.5rem, -98.5vh);
    }
  }
}
.smart-info--title__additional {
  font-size: 50px;
  position: absolute;
  top: 25vh;
  text-shadow: 0px 0px 50px $brand_yellow;
  @include mobile-all {
    font-size: 30px;
    top: 38vh;
  }
}
.smart-info--yours {
  position: absolute;
  font-weight: 800;
  top: 45vh;
  font-size: 70px;
  text-align: center;
  text-transform: uppercase;
  color: $brand_yellow;
  @include mobile-all {
    font-size: 40px;
    top: 56vh
  }
}
.counter__rocket {
  position: absolute;
  font-size: 70px;
  top: 45vh;
  left: 0;
  right: 0;
  opacity: 0.3;
  color: white;
  text-align: center;
  @include mobile-all {
    font-size: 40px;
    top: 57vh
  }
  
}

.badge {
  position: absolute;
  border-radius: 10px;
  text-transform: uppercase;
  font-weight: 700;
  opacity: 0;
  transition: 0.5s;
  @include mobile-all {
    padding: 0 15px !important;
    height: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2vh !important;

  }
}
.anim1 {
  animation: move 5s linear infinite;
}
.anim2 {
  animation: move2 5s linear infinite;
}

.free {
  padding: 10px 15px;
  background: white;
  transform: translateX(20vw) translateY(-100vh);
}
.forStart {
  padding: 10px 20px;
  background: #f4b819;
  color: black;
  transition: .4s;
  @include mobile-all {
    transform: translateX(60vw) translateY(-100vh) rotate(25deg);
  }
}

.best {
  padding: 10px 20px;
  background: #f4b819;
  color: black;
  @include mobile-all {
    padding: 1.2vh 20px;
  }
}

.info {
  padding: 10px 20px;
  background: #ffffff;
  color: black;
  left: 20%;
  font-size: 20px;
  top: 60%;
  @include mobile-all {
    left: 10%;
    top: 60%;
  }
}
.where {
  padding: 10px 15px;
  background: #ee9024;
  color: black;
}

.guide {
  padding: 10px 15px;
  background: #ee9024;
  color: black;
  right: 12%;
  font-size: 20px;
  top: 47%;

  @include mobile-all {
    right: 10%;
    font-size: 15px;
    top: 25%;
  }
}


.dropBest {
  animation: dropBest 2s cubic-bezier(0, 0, 0.35, 1) forwards;
  @include mobile-all {
    animation: dropBestMobile 2s cubic-bezier(0, 0, 0.35, 1) forwards;
  }
}
.droppedWhere {
  animation: dropWhere 2s cubic-bezier(0, 0, 0.35, 1) forwards;
  @include mobile-all {
    animation: dropWhereMobile 2s cubic-bezier(0, 0, 0.35, 1) forwards;
  }
}
.droppedFree {
  animation: dropFree 2s cubic-bezier(0, 0, 0.35, 1) forwards;

  @include mobile-all {
    animation: dropFreeMobile 2s cubic-bezier(0, 0, 0.35, 1) forwards;
    animation-delay: 1s;
  }
}
.droppedStart {
  animation: dropStart 2s cubic-bezier(0, 0, 0.35, 1) forwards;
  @include mobile-all {
    animation: dropStartMobile 2s cubic-bezier(0, 0, 0.35, 1) forwards;
    animation-delay: 1s;
  }
}
.show {
  opacity: 1;
}

.clicker {
  position: fixed;
  font-size: 20px;
  color: $brand_yellow;
  opacity: 0.7;
  text-transform: uppercase;
  left: 5%;
  top: 20%;
  height: 150px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 50%;
  border: 2px dashed white;
  z-index: 100;
  animation: shake 2s infinite;
  &:hover {
    cursor: pointer;
  }

  @include mobile-all {
    position: absolute;
  }
}

.counter {
  z-index: 1;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  right: 0;
  top: calc(50% + 150px/2);
  color: white;
  opacity: 0.3;
  left: 0;
  text-align: center;

  @include mobile-all {
    top: 60vh;
  }
}
.showCounter {
  display: flex;
  @include mobile-all {
    right: 0;
  }
}

.counter__text, .counter__count, .counter__rocket {
  text-transform: uppercase;
  font-weight: 700;
}
.counter__count--count {
  width: 150px;
  @include mobile-all {
    width: 100px;
  }
}
.counter__count {
  font-size: 150px;
  text-align: center;
  @include mobile-all {
    font-size: 100px;
  }

}

.link_image {
  position: absolute;
  width: 70px;
  height: auto;
  right: 10vw;
  top: 13vh;
  box-shadow: 0px 0px 15px 3px rgba(0,0,0,0.5);
  animation: shake 3s infinite;
  @include mobile-all {
    width: 50px;
    top: 20vh;
  }
}
.link_image_up {
  transition: 1s;
  animation: upRocked 3s ease-out;
  opacity: 0;
}
.more-info {
  position: absolute;
  top: 90px;
  right: 25vw;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @include mobile-all {
    right: 30vw;
  }
  span {
    font-size: 20px;
    font-weight: 700;
    color: white;
    margin-top: 35px;
    border-bottom: 2px dashed $brand_yellow;
    @include mobile-all {
      font-size: 16px;
      margin-top: 30px;
    }
  }
}
.more-info__image {
  width: 70px;
  height: auto;
  transform: rotate(-180deg);
  animation: bounce 2s infinite;
  @include mobile-all {
    width: 50px;
  }
}
</style>