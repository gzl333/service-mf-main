<script setup lang="ts">
import { ref/* , computed */ } from 'vue'
// import { useStore } from 'stores/store'
// import { i18n } from 'boot/i18n'
// import { navigateToUrl } from 'single-spa'

// import HeaderContent from 'components/HeaderContent.vue'

// const props = defineProps({
//   foo: {
//     type: String,
//     required: false,
//     default: ''
//   }
// })
// const emits = defineEmits(['change', 'delete'])

// const { tc } = i18n.global
// const store = useStore()

// scroll info
const scrollTop = ref(0)
const onScroll = (info: Record<string, Record<string, number>>) => {
  scrollTop.value = info.position.top
}
// const scrollRatio = computed(() => scrollTop.value > 400 ? 0.4 : scrollTop.value / 400 * 0.4)
// const dynamicBackground = computed(() => {
//   return {
//     background: `rgb(0,0,0, ${scrollRatio.value})`
//   }
// })
</script>

<template>
  <q-layout view="lHh Lpr lFf" style="min-width: 500px; min-height: 500px;">

    <!--    <q-header :elevated="scrollRatio===0.4" class="home-header row justify-center" :style="dynamicBackground">-->

<!--    <Transition>-->
<!--      <q-header v-if="scrollTop >= 100" reveal class="home-header" style="background: #0E3754;">-->
<!--        <HeaderContent/>-->
<!--      </q-header>-->
<!--    </Transition>-->

    <q-page-container style="padding-top: 0 !important;">
      <q-page class="non-selectable">
        <q-scroll-area class="home-scroll-area">
          <q-scroll-observer @scroll="onScroll"/>
          <router-view :key="$route.fullPath"/>
        </q-scroll-area>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<style lang="scss" scoped>
.HomeLayout {
}

.v-enter-active {
  transition: opacity 0.5s ease-in;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.home-header {
  height: 100px;
  line-height: 100px;
}

.home-scroll-area {
  height: 100vh;
  min-width: 300px;
}
</style>
