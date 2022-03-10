<script setup lang="ts">
// import { ref, computed } from "vue"
import useStore from 'src/store'
// import { i18n } from 'boot/i18n'

import MyHeader from 'components/MyHeader.vue'

// const props = defineProps({
//   foo: {
//     type: String,
//     required: false,
//     default: ''
//   }
// })
// const emits = defineEmits(['change', 'delete'])

const store = useStore()
console.log('@cnic/main store:', store.$state)
// the root layout of @cnic/main, load @cnic/main's  store here

</script>

<template>
  <q-layout view="lHh Lpr lFf" style="min-height: 0px !important;">

    <MyHeader/>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<style lang="scss" scoped>
.MyLayout {
}
</style>
