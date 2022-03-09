<script setup lang="ts">
// import { ref, computed } from "vue"
import useStore from 'src/store'
import { i18n } from 'boot/i18n'

// const props = defineProps({
//   foo: {
//     type: String,
//     required: false,
//     default: ''
//   }
// })
// const emits = defineEmits(['change', 'delete'])

const store = useStore()

// code starts...
</script>

<template>
  <div class="MyPage">
    登录后的首页：全局统计信息，快捷方式
    <div class="text-primary">{{i18n.global.tc('翻译测试')}}</div>
    <div>store:{{store.counter}}</div>
    <q-btn @click="store.increment">+1</q-btn>
  </div>
</template>

<style lang="scss" scoped>
.MyPage {
}
</style>
