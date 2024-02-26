<template>
  <component :is="componentButton" :href="props.to" :to="props.to" :class="[buttonClass, {'--fluid': fluid}]">
    {{ props.title }}
  </component>
</template>
<script lang="ts" setup>
import {computed} from "vue";

interface IDefaultYellowButton {
  title: string,
  fluid: boolean,
  type?: 'yellow' | 'black',
  to?: string
}
const props = withDefaults(defineProps<IDefaultYellowButton>(), {
  title: 'Открыть',
  fluid: false,
  type: 'yellow',

})
const classByType = {
  yellow: 'button__main',
  black: 'button__black'
}

const componentButton = computed(() => props.to ? props.to.startsWith('http') ? 'a' : 'router-link' : 'button')
const buttonClass = computed(() => classByType[props.type])
</script>
<style lang="scss" scoped>
.button__main {
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  padding: 16px 20px;
  background: $brand_yellow;
  box-shadow: 0 4px 11px 0 rgba(0, 0, 0, 0.31);
  text-transform: uppercase;
  border-radius: 20px;
  font-weight: 700;
  font-size: 18px;
  border: unset;
}

.--fluid {
  width: 100%
}
</style>