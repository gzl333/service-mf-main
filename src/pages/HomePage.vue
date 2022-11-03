<script setup lang="ts">
import { ref, watch, /* computed, */ onMounted, onUnmounted } from 'vue'
// import { useStore } from 'stores/store'
import { i18n } from 'boot/i18n'
import { navigateToUrl } from 'single-spa'
import * as THREE from 'three'
import VANTA from 'vanta/dist/vanta.clouds.min'

import HeaderContent from 'components/HeaderContent.vue'

// const props = defineProps({
//   foo: {
//     type: String,
//     required: false,
//     default: ''
//   }
// })
// const emits = defineEmits(['change', 'delete'])

const { tc } = i18n.global
// const store = useStore()

const videoDom = ref() // 容纳动画的dom对象
const animation = ref() // 动画对象

const startAnimation = () => {
  animation.value = VANTA({
    THREE,
    el: videoDom.value,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    skyColor: 0x2977a4,
    sunColor: 0xe88628
  })
}
const stopAnimation = () => {
  animation.value.destroy()
}

// 单一开关控制动画
const isAnimationPlaying = ref(true)
watch(isAnimationPlaying, () => {
  if (isAnimationPlaying.value) {
    // mount the animation
    startAnimation()
  } else {
    stopAnimation()
  }
})

/* FPS测量 */
const avgFps = ref(60) // 认为初始帧率为满值
const countFps = () => {
  let fps = 0
  let before = Date.now()
  let now = Date.now()
  requestAnimationFrame(
    function loop () {
      now = Date.now()
      fps = Math.round(1000 / (now - before))
      before = now
      requestAnimationFrame(loop)
    }
  )
  setInterval(() => {
    avgFps.value = (avgFps.value + fps) / 2
  }, 1000)
}
/* FPS测量 */

/* 过低FPS保护, 过低帧率则停止动画 */
const guardFps = () => {
  const MIN_FPS = 18 // 最低帧率
  const timer = setInterval(() => {
    if (avgFps.value < MIN_FPS) {
      isAnimationPlaying.value = false
      clearInterval(timer)
    }
  }, 100)
}
/* 过低FPS侦测 */

// const dynamicWords = computed(() => i18n.global.locale === 'zh' ? ['云计算', '对象存储', '运维监控'] : ['Cloud Computing', 'Object Storage', 'Operations'])
// const displayWord = ref(dynamicWords.value[0])
// const displayIndex = ref(1)
// setInterval(() => {
//   const currentWord = dynamicWords.value[displayIndex.value % 3]
//   let innerIndex = 0
//   let step = 1
//   const innerTimer = setInterval(() => {
//     displayWord.value = currentWord.slice(innerIndex)
//     innerIndex += step
//     if (innerIndex + 1 === currentWord.length) {
//       step = -1
//     }
//   }, 100)
//   clearInterval(innerTimer)
//   displayIndex.value += 1
// }, 3000)

onMounted(() => {
  // start animation
  startAnimation()
  // start FPS counting
  countFps()
  // monitor FPS
  guardFps()
})

onUnmounted(() => {
  stopAnimation()
})

</script>

<template>
  <div class="HomePage">

    <q-page-sticky position="bottom-left" :offset="[5, 5]">
      <div class="text-grey-5 cursor-pointer" @click="isAnimationPlaying = true">开启动画</div>
      <div class="text-grey-5 cursor-pointer" @click="isAnimationPlaying = false">关闭动画</div>
      <div class="text-grey-5">FPS: {{ avgFps.toFixed(2) }}</div>
    </q-page-sticky>

    <div ref="videoDom"
         class="column items-center gradient-background"
         :class="isAnimationPlaying?'animation-mask':''"
         style="height: 50vh; min-height: 500px;">

      <HeaderContent/>

      <!--      <q-separator/>-->

      <div class="col column justify-center">
        <div class="row items-center justify-center text-black text-h1 text-weight-bold q-pb-lg"
             style="background: -webkit-linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(0,112,218,1) 90% ); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
          {{ tc('一体化') }}
        </div>
        <div class="row items-center justify-center text-black text-h2 text-weight-bold q-pb-lg">
          <!--          <div class="col-auto"-->
          <!--               style="border-bottom: rgba(0,112,218,1) 10px solid ">-->
          <!--            {{ displayWord }}-->
          <!--          </div>-->
          <div class="col-auto">
            {{ tc('计算、存储与监控的解决方案') }}
          </div>
        </div>
        <div class="row items-center justify-center text-grey-7 text-h5 q-pb-lg">
          {{ tc('一站式满足科研IT需求') }}
        </div>
        <div class="row items-center justify-center q-gutter-md">
          <q-btn class="col-auto" style="background-color: #0055A6;" text-color="white" unelevated no-caps
                 :ripple="false"
                 @click="navigateToUrl('/about')">
            平台介绍
          </q-btn>
          <q-btn class="col-auto" style="background-color: #0055A6;" text-color="white" unelevated no-caps
                 :ripple="false"
                 @click="navigateToUrl('/case')">成功案例
          </q-btn>
          <q-btn class="col-auto" style="background-color: #0055A6;" text-color="white" :ripple="false"
                 icon-right="chevron_right"
                 unelevated no-caps>开始使用
          </q-btn>
        </div>
      </div>

    </div>

    <div class="column items-center justify-center">

      <div class="col row items-center justify-center content-fixed-width q-gutter-x-lg q-mb-xl"
           style="min-height: 300px;">

        <q-card class="col-auto cursor-pointer" style="width: 300px;" flat>
          <q-card-section>
            <div class="row justify-center">
              <img :src="require('assets/svg/compute.svg')" style="width: 200px;"/>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row justify-center text-center">
              <div class="text-h5 text-weight-bold text-primary">科研云主机</div>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="col-auto cursor-pointer" style="width: 300px;" flat>
          <q-card-section>
            <div class="row justify-center">
              <img :src="require('assets/svg/object_storage.svg')" style="width: 200px;"/>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row justify-center text-center">
              <div class="text-h5 text-weight-bold text-primary">对象存储</div>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="col-auto cursor-pointer" style="width: 300px;" flat>
          <q-card-section>
            <div class="row justify-center">
              <img :src="require('assets/svg/ops.svg')" style="width: 200px;"/>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row justify-center text-center">
              <div class="text-h5 text-weight-bold text-primary">云监控</div>
            </div>
          </q-card-section>
        </q-card>

      </div>

      <div class="col row items-center justify-center content-fixed-width q-gutter-x-lg q-ma-xl"
           style="min-height: 300px;">

        <q-card class="col-auto" style="width: 900px;" flat>
          <q-card-section horizontal>

            <img :src="require('assets/svg/big_compute.svg')" style="width: 400px;"/>

            <q-card-section>

              <div class="row items-center justify-center">

                <div class="col column">
                  <div class="col row text-h5 text-weight-bold text-primary">
                    科研云主机
                  </div>

                  <div class="col row text-h6 text-weight-bold">
                    灵活配置
                  </div>

                  <div class="col row text-grey">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </div>

                  <div class="col row text-h6 text-weight-bold">
                    丰富操作系统
                  </div>

                  <div class="col row text-grey">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </div>
                </div>

              </div>

            </q-card-section>
          </q-card-section>
        </q-card>

      </div>

      <div class="col row items-center justify-center content-fixed-width q-gutter-x-lg q-ma-xl"
           style="min-height: 300px;">

        <q-card class="col-auto" style="width: 900px;" flat>
          <q-card-section horizontal>

            <q-card-section>

              <div class="row items-center justify-center">

                <div class="col column">
                  <div class="col row text-h5 text-weight-bold text-primary">
                    对象存储
                  </div>

                  <div class="col row text-h6 text-weight-bold">
                    灵活容量
                  </div>

                  <div class="col row text-grey">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </div>

                  <div class="col row text-h6 text-weight-bold">
                    安全备份
                  </div>

                  <div class="col row text-grey">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </div>
                </div>

              </div>

            </q-card-section>

            <img :src="require('assets/svg/big_storage.svg')" style="width: 350px;"/>

          </q-card-section>
        </q-card>

      </div>

      <div class="col row items-center justify-center content-fixed-width q-gutter-x-lg q-ma-xl"
           style="min-height: 300px;">

        <q-card class="col-auto" style="width: 900px;" flat>
          <q-card-section horizontal>

            <img :src="require('assets/svg/big_ops.svg')" style="width: 400px;"/>

            <q-card-section>

              <div class="row items-center justify-center">

                <div class="col column">
                  <div class="col row text-h5 text-weight-bold text-primary">
                    云监控
                  </div>

                  <div class="col row text-h6 text-weight-bold">
                    集中管理
                  </div>

                  <div class="col row text-grey">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </div>

                  <div class="col row text-h6 text-weight-bold">
                    快速响应
                  </div>

                  <div class="col row text-grey">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </div>
                </div>

              </div>

            </q-card-section>
          </q-card-section>
        </q-card>

      </div>

      <div class="col row items-center justify-center content-fixed-width q-gutter-x-lg q-ma-xl"
           style="min-height: 500px;">

        <q-card v-for="i in ['灵活配置','快速部署','轻松扩容','多重备份','高可靠性','安全保障']" :key="i"
                class="col-auto" style="width: 300px;" flat>
          <q-card-section>
            <div class="row justify-center">
              <img :src="require('assets/svg/compute.svg')" style="width: 80px;"/>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row justify-center text-center">
              <div class="text-h6 text-weight-bold">{{ i }}</div>
            </div>

          </q-card-section>

          <!--          <q-card-section class="q-pt-none">-->
          <!--            <div class="row justify-center">-->
          <!--              <div class="text-grey">-->
          <!--                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod-->
          <!--                tempor incididunt ut labore et dolore magna aliqua.-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </q-card-section>-->
        </q-card>

      </div>

      <div class="col row items-center justify-center content-fixed-width q-gutter-x-lg q-mb-xl"
           style="min-height: 500px;">
        <q-card class="col-auto" style="width: 900px;" flat>
          <q-card-section horizontal>

            <q-card-section>

              <div class="row items-center justify-center">

                <div class="col column">
                  <div class="col row text-h5 text-weight-bold text-primary">
                    案例1
                  </div>

                  <div class="col row text-h6 text-weight-bold">
                    案例简介
                  </div>

                  <div class="col row text-grey">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </div>

                  <div class="col-auto">
                    <q-btn class="" color="primary" @click="navigateToUrl('/case')">案例链接</q-btn>
                  </div>

                </div>

              </div>

            </q-card-section>

            <img :src="require('assets/svg/big_storage.svg')" style="width: 300px;"/>

          </q-card-section>
        </q-card>

      </div>

      <div class="col row items-center justify-center content-fixed-width q-gutter-x-lg q-mb-xl"
           style="min-height: 300px;">

        <q-card class="col-auto" style="width: 900px;" flat>
          <q-card-section horizontal>

            <!--            <img :src="require('assets/svg/big_compute.svg')" style="width: 400px;"/>-->

            <q-card-section>

              <div class="row items-center justify-center">

                <div class="col column">
                  <div class="col row text-h5 text-weight-bold text-primary">
                    研发团队简介
                  </div>

                  <!--                  <div class="col row text-h6 text-weight-bold">-->
                  <!--                    灵活配置-->
                  <!--                  </div>-->

                  <!--                  <div class="col row text-grey">-->
                  <!--                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod-->
                  <!--                    tempor incididunt ut labore et dolore magna aliqua.-->
                  <!--                  </div>-->

                  <!--                  <div class="col row text-h6 text-weight-bold">-->
                  <!--                    丰富操作系统-->
                  <!--                  </div>-->

                  <div class="col row text-grey">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </div>

                  <div class="col-auto">
                    <q-btn class="" color="primary" @click="navigateToUrl('/about')">团队介绍链接</q-btn>
                  </div>
                </div>

              </div>

            </q-card-section>
          </q-card-section>
        </q-card>

      </div>

      <div class="col-auto column items-center content-fixed-width">
        <div>{{ tc('home.copyright') }}</div>
        <div>京ICP备09112257号-94</div>
      </div>

    </div>

  </div>
</template>

<style lang="scss" scoped>
.HomePage {
}

.gradient-background {
  background-color: #5997BE; /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #5997BE, #FFFFFF); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #5997BE, #FFFFFF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.animation-mask {
  -webkit-mask-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 1)), color-stop(0.8, rgba(0, 0, 0, 1)), to(rgba(0, 0, 0, 0)));
}
</style>
