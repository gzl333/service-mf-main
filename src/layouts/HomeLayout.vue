<script setup lang="ts">
import { ref, computed } from 'vue'
import useStore from 'src/store'
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

        <div class="col-auto text-h5">
          一体化云服务平台
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

          <div class="part1 shapedivider" ref="part1">
            <div class="q-pa-lg">
              <h3 class="text-white">服务简介1</h3>
            </div>

          </div>

          <div class="part2" ref="part2">
            <div class="q-pa-lg">
              <h3>服务简介2</h3>
            </div>

          </div>

          <div class="home-footer">
            <div>©{{ new Date().getFullYear() }} CNIC 京ICP备09112257号-94</div>
          </div>
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

.part1 {
  padding-top: 80px;
  user-select: none;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: -10;
  width: 100%;
  background-image: linear-gradient(to right top, #92FFC0, #002661);

  h3 {
    text-align: center;
    margin-top: 40vh;
  }
}

.part2 {
  padding-top: 80px;
  user-select: none;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: -10;
  width: 100%;
  background-color: white;

  h3 {
    text-align: center;
    margin-top: 40vh;
  }
}

.shapedivider {
  overflow: hidden;
  position: relative;
}

.shapedivider::before {
  content: '';
  font-family: 'shape divider from ShapeDividers.com';
  position: absolute;
  z-index: 3;
  pointer-events: none;
  background-repeat: no-repeat;
  bottom: -0.1vw;
  left: -0.1vw;
  right: -0.1vw;
  top: -0.1vw;
  background-size: 100% 258px;
  background-position: 50% 100%;
  background-image: url('data:image/svg+xml;charset=utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.28 2.17" preserveAspectRatio="none"><path d="M35.28 1.67c-3.07-.55-9.27.41-16.15 0-6.87-.4-13.74-.58-19.13.1v.4h35.28z" fill="%23ffffff"/><path d="M35.28 1.16c-3.17-.8-7.3.4-10.04.56-2.76.17-9.25-1.47-12.68-1.3-3.42.16-4.64.84-7.04.86C3.12 1.31 0 .4 0 .4v1.77h35.28z" opacity=".5" fill="%23ffffff"/><path d="M35.28.31c-2.57.84-7.68.3-11.8.43-4.1.12-6.85.61-9.57.28C11.18.69 8.3-.16 5.3.02 2.3.22.57.85 0 .87v1.2h35.28z" opacity=".5" fill="%23ffffff"/></svg>');
}

@media (min-width: 2100px) {
  .shapedivider::before {
    background-size: 100% calc(2vw + 258px);
  }
}

.home-footer {
  color: #ECEFF4;
  text-align: center;
  height: 50px;
  line-height: 50px;
  background-color: #2E3440;
}
</style>
