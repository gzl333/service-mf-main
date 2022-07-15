<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'stores/store'
import { i18n } from 'boot/i18n'

import I18nSwitch from 'components/I18nSwitch.vue'

// const props = defineProps({
//   foo: {
//     type: String,
//     required: false,
//     default: ''
//   }
// })
// const emits = defineEmits(['change', 'delete'])

const { tc } = i18n.global
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
  <q-layout view="lHh Lpr lFf" style="min-width: 500px; min-height: 500px;">

    <q-header :elevated="scrollRatio===0.4" class="home-header row justify-center" :style="dynamicBackground">
      <div class="row justify-between items-center no-wrap content-fixed-width">

        <div class="col-auto row items-center">
          <img src="../assets/cstcloud_logo.png" style="height: 50px;"/>
          <div class="text-grey-3 text-h5">{{ tc('一体化云服务平台') }}</div>
        </div>

        <div class="col-auto row">

          <I18nSwitch class="q-mr-lg" :is-dark="true"/>

          <q-btn class="q-mr-lg gt-xs" flat :ripple="false" color="white" type="a" no-caps dense
                 href="https://passport.escience.cn/regist.jsp"
                 target="_blank">
            {{ tc('注册') }}
          </q-btn>

          <q-btn flat
                 dense
                 :ripple="false"
                 color="white"
                 no-caps
                 @click="store.askUrl('passport')"
          >
            {{ tc('科技云通行证登录') }}
          </q-btn>

          <q-btn-dropdown
            class="transparent"
            content-class="transparent"
            flat
            dense
            no-caps
            auto-close
            padding="none"
            :ripple="false"
            color="grey-1"
          >
            <q-btn
              class="full-width transparent"
              flat
              :ripple="false"
              text-color="white"
              no-caps
              @click="store.askUrl('aai')">
              {{ tc('科技云AAI登录') }}
            </q-btn>
          </q-btn-dropdown>

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
