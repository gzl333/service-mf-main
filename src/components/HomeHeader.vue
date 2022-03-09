<script setup lang="ts">
// import { ref, computed } from "vue"
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

// code starts...
</script>

<template>
  <q-header bordered reveal>
    <q-toolbar>
      <q-toolbar-title>
        统一服务入口 登录前
      </q-toolbar-title>

      <q-btn  :ripple="false" color="primary" label="登 录" @click="store.askUrl('passport')"/>

    </q-toolbar>
  </q-header>
</template>

<style lang="scss" scoped>
.HomeHeader {
}
</style>
