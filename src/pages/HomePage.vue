<script setup lang="ts">
import { ref, watch, /* computed, */ onMounted, onUnmounted } from 'vue'
import { useStore } from 'stores/store'
import { i18n } from 'boot/i18n'
import { navigateToUrl } from 'single-spa'
import { scroll } from 'quasar'
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
const store = useStore()
const {
  getScrollTarget,
  setVerticalScrollPosition
} = scroll

// jump within the page
function scrollToElement (el: HTMLElement, duration = 1000) {
  const target = getScrollTarget(el)
  const offset = el.offsetTop
  setVerticalScrollPosition(target, offset, duration)
}

const serverDom = ref()
const storageDom = ref()
const monitorDom = ref()

const videoDom = ref() // 容纳动画的dom对象
const animation = ref() // 动画对象

const startAnimation = () => {
  // animation.value = VANTA({
  //   THREE,
  //   el: videoDom.value,
  //   mouseControls: true,
  //   touchControls: true,
  //   gyroControls: false,
  //   minHeight: 200.00,
  //   minWidth: 200.00,
  //   skyColor: 0x2977a4,
  //   sunColor: 0xe88628
  // })
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
                 @click="navigateToUrl('/case')">
            成功案例
          </q-btn>
          <q-btn class="col-auto" style="color: #0055A6;" :ripple="false"
                 icon-right="chevron_right"
                 outline
                 no-caps
                 @click="store.askUrl('passport')">
            开始使用
          </q-btn>
        </div>
      </div>

    </div>

    <div class="column items-center justify-center">
      <div class="col row items-center justify-center content-fixed-width q-gutter-x-md"
           style="min-height: 300px;">

        <q-card class="col-auto cursor-pointer" style="width: 200px;" flat @click="scrollToElement(serverDom, 1000)">
          <q-card-section>
            <div class="row justify-center">
              <img :src="require('assets/svg/compute.svg')" style="width: 180px;"/>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row justify-center text-center">
              <div class="text-h5 text-weight-bold text-black">科研云主机</div>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="col-auto cursor-pointer" style="width: 200px;" flat @click="scrollToElement(storageDom, 2000)">
          <q-card-section>
            <div class="row justify-center">
              <img :src="require('assets/svg/object_storage.svg')" style="width: 180px;"/>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row justify-center text-center">
              <div class="text-h5 text-weight-bold text-black">对象存储</div>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="col-auto cursor-pointer" style="width: 200px;" flat @click="scrollToElement(monitorDom, 3000)">
          <q-card-section>
            <div class="row justify-center">
              <img :src="require('assets/svg/ops.svg')" style="width: 180px;"/>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row justify-center text-center">
              <div class="text-h5 text-weight-bold text-black">云监控</div>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="col-auto cursor-pointer" style="width: 200px;" flat>
          <q-card-section>
            <div class="row justify-center">
              <img :src="require('assets/svg/protect.svg')" style="width: 180px;"/>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row justify-center text-center">
              <div class="text-h5 text-weight-bold text-black">等保云主机</div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div ref="serverDom" class="col row items-center justify-center content-fixed-width q-gutter-x-lg q-mb-xl"
           style="min-height: 300px;">

        <q-card class="col-auto" style="width: 900px;" flat>
          <q-card-section horizontal>

            <img :src="require('assets/svg/big_compute.svg')" style="width: 400px;"/>

            <q-card-section>

              <div class="row items-center justify-center">

                <div class="col column" style="height: 350px;">
                  <div class="col row items-center text-h5 text-weight-bold text-primary">
                    科研云主机
                  </div>

                  <div class="col column">
                    <div class="col row items-center text-h6 text-weight-bold">
                      灵活配置
                    </div>

                    <div class="col row text-grey">
                      可以根据科研需求，灵活选择所需硬件配置。
                      CPU、内存、操作系统、网络类型等均可轻松选择配置。
                    </div>
                  </div>

                  <div class="col column">
                    <div class="col row items-center text-h6 text-weight-bold">
                      一键部署
                    </div>

                    <div class="col row text-grey">
                      点击部署按键之后，平台将自动接管部署任务。
                      并在极短时间内将所需云主机实例部署在对应的服务单元内，无需任何额外的操作。
                    </div>
                  </div>

                  <div class="col column">
                    <div class="col row items-center text-h6 text-weight-bold">
                      简单易用
                    </div>

                    <div class="col row text-grey">
                      精心设计的管理界面使得云主机的管理变得简单而符合直觉，无需学习即可点击使用。
                      常见的管理操作，例如开关机、重置实例、操作保护等，均可在几次点击中实现。
                    </div>
                  </div>

                </div>

              </div>

            </q-card-section>
          </q-card-section>
        </q-card>

      </div>

      <div ref="storageDom" class="col row items-center justify-center content-fixed-width q-gutter-x-lg q-mb-xl"
           style="min-height: 300px;">

        <q-card class="col-auto" style="width: 900px;" flat>
          <q-card-section horizontal>

            <q-card-section>

              <div class="row items-center justify-center">

                <div class="col column" style="height: 350px;">
                  <div class="col row items-center text-h5 text-weight-bold text-primary">
                    对象存储
                  </div>

                  <div class="col column">
                    <div class="col row items-center text-h6 text-weight-bold">
                      海量存储
                    </div>

                    <div class="col row text-grey">
                      基于存储桶的管理模式，可支持PB级非/半结构化数据的海量存储。存储桶容量不存在理论上限，随用随存，适合数据密集的项目采用。
                    </div>
                  </div>

                  <div class="col column">
                    <div class="col row items-center text-h6 text-weight-bold">
                      高安全性
                    </div>

                    <div class="col row text-grey">
                      底层存储基于纠删码技术，采用多服务中心冗余备份，提供稳定持久、高性能、高可用分布式存储服务。
                    </div>
                  </div>

                  <div class="col column">
                    <div class="col row items-center text-h6 text-weight-bold">
                      丰富接口
                    </div>

                    <div class="col row text-grey">
                      除了可以在本平台Web页面进行上传、下载、共享对象存储桶的数据，还可以通过HTTP RESTFul
                      API、FTP协议、Rclone客户端等多种方式访问对象数据，方便地进行数据传输。
                    </div>
                  </div>

                </div>

              </div>

            </q-card-section>

            <img :src="require('assets/svg/big_storage.svg')" style="width: 400px;"/>

          </q-card-section>
        </q-card>

      </div>

      <div ref="monitorDom" class="col row items-center justify-center content-fixed-width q-gutter-x-lg q-mb-xl"
           style="min-height: 300px;">

        <q-card class="col-auto" style="width: 900px;" flat>
          <q-card-section horizontal>

            <img :src="require('assets/svg/big_ops.svg')" style="width: 400px;"/>

            <q-card-section>

              <div class="row items-center justify-center">

                <div class="col column" style="height: 350px;">
                  <div class="col row items-center text-h5 text-weight-bold text-primary">
                    云监控
                  </div>

                  <div class="col column">
                    <div class="col row items-center text-h6 text-weight-bold">
                      集中采集
                    </div>

                    <div class="col row text-grey">
                      对跨地区跨机房的多服务单元的运行数据进行集中采集，构建针对视频会议平台、主机集群、存储集群的统一监控，汇聚众多监控数据。
                    </div>
                  </div>

                  <div class="col column">
                    <div class="col row items-center text-h6 text-weight-bold">
                      实时展示
                    </div>

                    <div class="col row text-grey">
                      实时、可视化地展示各集群的主机状态、集群状态、CPU使用率、内存使用率、磁盘使用率等。
                    </div>
                  </div>

                  <div class="col column">
                    <div class="col row items-center text-h6 text-weight-bold">
                      持久化存储
                    </div>

                    <div class="col row text-grey">
                      监控数据实现了持久化存储，可用来进行运维管理、事故追溯、智能分析等。
                    </div>
                  </div>

                </div>

              </div>

            </q-card-section>
          </q-card-section>
        </q-card>

      </div>

      <!--      <div class="col row items-center justify-center content-fixed-width q-gutter-x-lg q-ma-xl"-->
      <!--           style="min-height: 500px;">-->
      <!--        <q-card v-for="i in ['灵活配置','快速部署','轻松扩容','多重备份','高可靠性','安全保障']" :key="i"-->
      <!--                class="col-auto" style="width: 300px;" flat>-->
      <!--          <q-card-section>-->
      <!--            <div class="row justify-center">-->
      <!--              <img :src="require('assets/svg/compute.svg')" style="width: 80px;"/>-->
      <!--            </div>-->
      <!--          </q-card-section>-->

      <!--          <q-card-section class="q-pt-none">-->
      <!--            <div class="row justify-center text-center">-->
      <!--              <div class="text-h6 text-weight-bold">{{ i }}</div>-->
      <!--            </div>-->

      <!--          </q-card-section>-->
      <!--        </q-card>-->
      <!--      </div>-->

      <div class="col row items-center justify-center content-fixed-width q-gutter-x-lg q-mb-lg">
        <div class="row justify-center" style="width: 900px;">
          <q-card-section>

            <q-card-section>

              <q-avatar size="150px" font-size="52px" color="grey-3" text-color="primary">
                7个
              </q-avatar>

            </q-card-section>

              <div class="row items-center justify-center">

                <div class="col column justify-center" >

                  <div class="col-auto row items-center text-h6 text-weight-bold">
                    科研云主机服务单元
                  </div>

                  <div class="col-auto row text-grey">
                    来自地球大数据科学工程专项、中国科学院计算机网络信息中心、中国科学院国家空间科学中心等机构
                  </div>

                </div>

              </div>

          </q-card-section>
        </div>

        <div class="row justify-start" style="width: 900px;">
          <q-card-section horizontal>

            <q-card-section>

              <q-avatar size="150px" font-size="52px" color="grey-3" text-color="primary">
                2个
              </q-avatar>

            </q-card-section>

            <q-card-section>

              <div class="row items-center justify-center">

                <div class="col column justify-center" style="height: 150px;">

                  <div class="col-auto row items-center text-h6 text-weight-bold">
                    对象存储服务单元
                  </div>

                  <div class="col-auto row text-grey">
                    来自中国科学院计算机网络信息中心、运维大数据平台等机构
                  </div>

                </div>

              </div>

            </q-card-section>

          </q-card-section>
        </div>

        <div class="row justify-center" style="width: 900px;">

          <q-card-section>
            <q-card-section>
              <q-avatar size="150px" font-size="26px" color="grey-3" text-color="primary">
                约8000核
              </q-avatar>
            </q-card-section>
            <div class="col-auto row items-center justify-center text-h6 text-weight-bold">
              CPU
            </div>
          </q-card-section>

          <q-card-section>
            <q-card-section>
              <q-avatar size="150px" font-size="26px" color="grey-3" text-color="primary">
                17466GB
              </q-avatar>
            </q-card-section>
            <div class="col-auto row items-center justify-center text-h6 text-weight-bold">
              内存
            </div>
          </q-card-section>

          <q-card-section>
            <q-card-section>
              <q-avatar size="150px" font-size="26px" color="grey-3" text-color="primary">
                25PB
              </q-avatar>
            </q-card-section>
            <div class="col-auto row items-center justify-center text-h6 text-weight-bold">
              对象存储
            </div>
          </q-card-section>

        </div>

        <div class="row justify-center" style="width: 900px;">

          <q-card-section>
            <q-card-section>
              <q-avatar size="150px" font-size="26px" color="grey-3" text-color="primary">
                139
              </q-avatar>
            </q-card-section>
            <div class="col-auto row items-center justify-center text-h6 text-weight-bold">
              活跃用户
            </div>
          </q-card-section>

          <q-card-section>
            <q-card-section>
              <q-avatar size="150px" font-size="26px" color="grey-3" text-color="primary">
                217
              </q-avatar>
            </q-card-section>
            <div class="col-auto row items-center justify-center text-h6 text-weight-bold">
              在用云主机
            </div>
          </q-card-section>

          <q-card-section>
            <q-card-section>
              <q-avatar size="150px" font-size="26px" color="grey-3" text-color="primary">
                1141
              </q-avatar>
            </q-card-section>
            <div class="col-auto row items-center justify-center text-h6 text-weight-bold">
              在用存储桶
            </div>
          </q-card-section>

        </div>

      </div>

      <div class="col row items-center justify-center content-fixed-width q-gutter-x-lg q-mb-xl"
           style="min-height: 100px;">
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

            <img :src="require('assets/svg/big_storage.svg')" style="width: 400px;"/>

          </q-card-section>
        </q-card>

      </div>

      <div class="col row items-center justify-center content-fixed-width q-gutter-x-lg q-mb-xl"
           style="min-height: 100px;">

        <q-card class="col-auto" style="width: 900px;" flat>
          <q-card-section horizontal>

            <!--            <img :src="require('assets/svg/big_compute.svg')" style="width: 400px;"/>-->

            <q-card-section>

              <div class="row items-center justify-center">

                <div class="col column">
                  <div class="col row text-h5 text-weight-bold text-primary">
                    团队简介
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
