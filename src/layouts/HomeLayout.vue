<script setup lang="ts">
import { ref, computed } from 'vue'
import useStore from 'stores/main'
// import { i18n } from 'boot/i18n'

// const props = defineProps({
//   foo: {
//     type: String,
//     required: false,
//     default: ''
//   }
// })
// const emits = defineEmits(['change', 'delete'])

const store = useStore()

// scroll info
const scrollTop = ref(0)
const onScroll = (info: Record<string, Record<string, number>>) => {
  scrollTop.value = info.position.top
}
const scrollRatio = computed(() => scrollTop.value > 400 ? 0.4 : scrollTop.value / 400 * 0.4)
const dynamicBackground = computed(() => {
  return {
    background: `rgb(0,0,0, ${scrollRatio.value})`
  }
})
</script>

<template>
  <q-layout view="lHh Lpr lFf">

    <q-header :elevated="scrollRatio===0.4" class="home-header row justify-center" :style="dynamicBackground"
              style="min-width: 500px;">
      <div class="row justify-between items-center no-wrap content-fixed-width">

        <div class="col-auto row items-center">
          <img src="../assets/cstcloud_logo.png" style="height: 50px;"/>
          <div class="text-grey-3 text-h5">一体化云服务平台</div>
        </div>

        <div class="col-auto q-gutter-sm">
          <q-btn class="gt-xs" outline :ripple="false" color="white" label="注 册" type="a"
                 href="https://passport.escience.cn/regist.jsp"
                 target="_blank"/>
          <q-btn unelevated :ripple="false" color="primary" label="登 录" @click="store.askUrl('passport')"/>

        </div>
      </div>
    </q-header>

    <q-page-container style="padding-top: 0 !important;">
      <q-page class="non-selectable">
        <q-scroll-area class="home-scroll-area">
          <q-scroll-observer @scroll="onScroll"/>
          <router-view/>
        </q-scroll-area>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<style lang="scss" scoped>
.HomeLayout {
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
