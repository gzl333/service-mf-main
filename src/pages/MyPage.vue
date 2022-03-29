<script setup lang="ts">
// import { ref, computed } from "vue"
// import useStore from 'src/store'
import { i18n } from 'boot/i18n'

const tc = i18n.global.tc

// const props = defineProps({
//   foo: {
//     type: String,
//     required: false,
//     default: ''
//   }
// })
// const emits = defineEmits(['change', 'delete'])

// const store = useStore()

// code starts...
</script>

<template>
  <!--  <q-page>-->
  <!-- /my 布局下每个页面都要自己添加q-scroll-area，不能写在router-view.否则其它application会带空白区域-->
  <q-scroll-area style="height: 100vh">
    <div class="MyPage" style="height: 100vh">
      登录后的首页：全局统计信息，快捷方式
      <div class="text-primary">{{ tc('翻译测试') }}</div>

      <div class="q-pa-md q-gutter-sm">
        <q-btn align="left" class="btn-fixed-width" color="primary" label="Align to left"/>
        <q-btn align="right" class="btn-fixed-width" color="secondary" label="Align to right"/>
        <q-btn align="between" class="btn-fixed-width" color="accent" label="Align between" icon="flight_takeoff"/>
        <q-btn align="around" class="btn-fixed-width" color="brown-5" label="Align around" icon="lightbulb_outline"/>
      </div>

    </div>
  </q-scroll-area>
  <!--  </q-page>-->
</template>

<style lang="scss" scoped>
.MyPage {
}
</style>
