<script setup lang="ts">
// import { ref, computed } from "vue"
import useStore from 'src/store'
// import { useI18n } from 'vue-i18n'

// const props = defineProps({
//   foo: {
//     type: String,
//     required: false,
//     default: ''
//   }
// })
// const emits = defineEmits(['change', 'delete'])

const store = useStore()
// const { locale } = useI18n({ useScope: 'global' })

// code starts...
</script>

<template>
  <div class="MyPage">
    登录后我的首页，显示：
    1. 全局统计信息
    2. 各服务快捷跳转

    <div>this is my index store: {{ store.counter }}</div>
    <q-btn @click="store.increment">add</q-btn>
  </div>
</template>

<style lang="scss" scoped>
.MyPage {
}
</style>
