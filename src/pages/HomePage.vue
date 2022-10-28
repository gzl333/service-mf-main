<script setup lang="ts">
import { ref, /* computed, */ onMounted, onUnmounted } from 'vue'
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
})
onUnmounted(() => {
  part1.value.destroy()
})
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
          {{ tc('计算、存储与运维的解决方案') }}
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

        <q-card v-for="i in [1,2,3,4,5,6]" :key="i" class="col-auto" style="width: 300px;" flat>
          <q-card-section>
            <div class="row justify-center">
              <img :src="require('assets/svg/compute.svg')" style="width: 80px;"/>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row justify-center text-center">
              <div class="text-h6 text-weight-bold">特点{{ i }}</div>
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
                    <q-btn class="" color="primary" >案例链接</q-btn>
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

//.part1 {
//  padding-top: 80px;
//  user-select: none;
//  height: 100vh; // calc(100vh - 50px);
//  top: 0;
//  left: 0;
//  z-index: -10;
//  width: 100%;
//  //background-image: linear-gradient(to right top, #92FFC0, #002661);
//  //background-image: linear-gradient(110.5deg, rgba(71, 114, 148, 1) 14.9%, rgba(149, 245, 211, 1) 77.9%);
//}

//.part2 {
//  padding-top: 80px;
//  user-select: none;
//  height: 100vh;
//  top: 0;
//  left: 0;
//  z-index: -10;
//  width: 100%;
//  background-color: grey-1;
//
//  h3 {
//    text-align: center;
//    margin-top: 40vh;
//  }
//}

//.shapedivider {
//  overflow: hidden;
//  position: relative;
//}
//
//.shapedivider::before {
//  content: '';
//  //font-family: 'shape divider from ShapeDividers.com';
//  position: absolute;
//  z-index: 3;
//  pointer-events: none;
//  background-repeat: no-repeat;
//  bottom: -0.1vw;
//  left: -0.1vw;
//  right: -0.1vw;
//  top: -0.1vw;
//  background-size: 100% 258px;
//  background-position: 50% 100%;
//  background-image: url('data:image/svg+xml;charset=utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.28 2.17" preserveAspectRatio="none"><path d="M35.28 1.67c-3.07-.55-9.27.41-16.15 0-6.87-.4-13.74-.58-19.13.1v.4h35.28z" fill="%23ffffff"/><path d="M35.28 1.16c-3.17-.8-7.3.4-10.04.56-2.76.17-9.25-1.47-12.68-1.3-3.42.16-4.64.84-7.04.86C3.12 1.31 0 .4 0 .4v1.77h35.28z" opacity=".5" fill="%23ffffff"/><path d="M35.28.31c-2.57.84-7.68.3-11.8.43-4.1.12-6.85.61-9.57.28C11.18.69 8.3-.16 5.3.02 2.3.22.57.85 0 .87v1.2h35.28z" opacity=".5" fill="%23ffffff"/></svg>');
//}
//
//@media (min-width: 2100px) {
//  .shapedivider::before {
//    background-size: 100% calc(2vw + 258px);
//  }
//}

//.home-footer {
//  color: #ECEFF4;
//  text-align: center;
//  height: 50px;
//  line-height: 25px;
//  background-color: rgba(0,0,0,0.1) //#2E3440;
//}
</style>
