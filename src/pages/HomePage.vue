<script setup lang="ts">
import { ref, /* computed, */ onMounted, onUnmounted, computed } from 'vue'
// import { useStore } from 'stores/store'
import { i18n } from 'boot/i18n'
// import { navigateToUrl } from 'single-spa'
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

const part1 = ref()

onMounted(() => {
  // part1.value = VANTA({
  //   THREE,
  //   el: part1.value,
  //   mouseControls: true,
  //   touchControls: true,
  //   gyroControls: false,
  //   minHeight: 200.00,
  //   minWidth: 200.00,
  //   skyColor: 0x2977a4,
  //   sunColor: 0xe88628
  // })

  // todo 判断帧率，过慢则取消动画
})
onUnmounted(() => {
  part1.value.destroy()
})

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

</script>

<template>
  <div class="HomePage">

    <div ref="part1" class="column items-center bg-grey-5"
         style="height: 60vh; min-height: 600px;
                -webkit-mask-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), color-stop(0.6, rgba(0,0,0,1)), color-stop(0.9, rgba(0,0,0,0.2)), to(rgba(0,0,0,0)));">

      <HeaderContent/>

      <!--      <q-separator/>-->

      <div class="col column justify-center">
        <div class="row items-center justify-center text-black text-h1 text-weight-bold q-pb-xl"
             style="background: -webkit-linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(0,112,218,1) 90% ); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
          {{ tc('一体化') }}
        </div>
        <div class="row items-center justify-center text-black text-h2 text-weight-bold q-pb-xl">
<!--          <div class="col-auto"-->
<!--               style="border-bottom: rgba(0,112,218,1) 10px solid ">-->
<!--            {{ displayWord }}-->
<!--          </div>-->
          <div class="col-auto">
            {{ tc('计算、存储与运维的解决方案') }}
          </div>
        </div>
        <div class="row items-center justify-center text-black text-h5">
          {{ tc('一站式满足科研IT需求') }}
        </div>
      </div>

    </div>

    <div class="column items-center justify-center">

      <div class="col row items-center justify-center content-fixed-width q-gutter-x-lg q-ma-xl"
           style="min-height: 300px;">

        <q-card class="col-auto shadow-24" style="width: 300px;">
          <q-card-section>
            <div class="row justify-center">
              <img :src="require('assets/svg/compute.svg')" style="width: 200px;"/>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row justify-center text-center">
              <div class="text-h5 text-weight-bold text-primary">云计算</div>
            </div>

          </q-card-section>

          <q-card-section>
            <div class="row justify-center">
              <div class="text-grey">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="col-auto shadow-24" style="width: 300px;">
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

          <q-card-section>
            <div class="row justify-center">
              <div class="text-grey">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="col-auto shadow-24" style="width: 300px;">
          <q-card-section>
            <div class="row justify-center">
              <img :src="require('assets/svg/ops.svg')" style="width: 200px;"/>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row justify-center text-center">
              <div class="text-h5 text-weight-bold text-primary">运维监控</div>
            </div>

          </q-card-section>

          <q-card-section>
            <div class="row justify-center">
              <div class="text-grey">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
              </div>
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
                    云主机
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
                    运维监控
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

        <q-card v-for="i in ['灵活配置','快速部署','轻松扩容','多重备份','高可靠性','安全保障']" :key="i" class="col-auto" style="width: 300px;" flat>
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

          <q-card-section class="q-pt-none">
            <div class="row justify-center">
              <div class="text-grey">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
          </q-card-section>
        </q-card>

      </div>

      <div class="col row items-center justify-center content-fixed-width q-gutter-x-lg q-ma-xl"
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
                    案例介绍
                  </div>

                  <div class="col row text-grey">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </div>

                  <div class="col-auto">
                    <q-btn class="" color="primary">案例链接</q-btn>
                  </div>

                </div>

              </div>

            </q-card-section>

            <img :src="require('assets/svg/big_storage.svg')" style="width: 300px;"/>

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
</style>
