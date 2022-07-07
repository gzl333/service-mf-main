<script setup lang="ts">
import { ref, /* computed, */ onMounted, onUnmounted } from 'vue'
// import { useStore } from 'stores/store'
import { i18n } from 'boot/i18n'
import * as THREE from 'three'
import CLOUD from 'vanta/dist/vanta.clouds.min'

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
  part1.value = CLOUD({
    THREE,
    el: part1.value,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    skyColor: 0x2977a4,
    sunColor: 0xe88628
  })
})
onUnmounted(() => {
  part1.value.destroy()
})
</script>

<template>
  <div class="HomePage">

    <!--    <div class="part1 shapedivider" ref="part1">-->
    <div class="part1" ref="part1">
      <div class="q-pa-lg">
        <h3 class="text-black">{{ tc('一体化云服务平台') }}</h3>
      </div>
    </div>

    <!--    <div class="part2" ref="part2">-->
    <!--      <div class="q-pa-lg">-->
    <!--        <h3>服务简介</h3>-->
    <!--      </div>-->
    <!--    </div>-->

    <div class="home-footer">
      <div>{{ tc('home.copyright') }}</div>
      <div>京ICP备09112257号-94</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.HomePage {
}

.part1 {
  padding-top: 80px;
  user-select: none;
  height: calc(100vh - 50px);
  top: 0;
  left: 0;
  z-index: -10;
  width: 100%;
  //background-image: linear-gradient(to right top, #92FFC0, #002661);
  //background-image: linear-gradient(110.5deg, rgba(71, 114, 148, 1) 14.9%, rgba(149, 245, 211, 1) 77.9%);

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
  //font-family: 'shape divider from ShapeDividers.com';
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
  line-height: 25px;
  background-color: #2E3440;
}
</style>
