<script setup lang="ts">
// import { ref, computed } from "vue"
import useStore from 'src/store'
// import { useI18n } from 'vue-i18n'
import { navigateToUrl } from 'single-spa'

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

  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title>
        中国科技云统一服务入口
      </q-toolbar-title>

      <q-btn @click="navigateToUrl('/')">/</q-btn>
      <q-btn @click="navigateToUrl('/my')">/my</q-btn>
      <q-btn @click="navigateToUrl('/my/server')">/my/server</q-btn>
      <q-btn @click="navigateToUrl('/my/server/param')">/my/server/param</q-btn>

      counter: {{ store.counter }}

      <q-btn @click="store.increment">+1</q-btn>

      <div>{{ $appName }}</div>
    </q-toolbar>
  </q-header>

</template>

<style lang="scss" scoped>
</style>
