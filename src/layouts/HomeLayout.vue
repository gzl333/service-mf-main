<script setup lang="ts">
// import { ref, computed } from "vue"
// import useStore from 'src/store'
// import { useI18n } from 'vue-i18n'

import GlobalHeader from 'components/GlobalHeader.vue'

// const props = defineProps({
//   foo: {
//     type: String,
//     required: false,
//     default: ''
//   }
// })
// const emits = defineEmits(['change', 'delete'])

// const store = useStore()
// const { locale } = useI18n({ useScope: 'global' })

// code starts...
</script>

<template>

  <q-layout view="lHh Lpr lFf" style="min-height: 0px !important;">

    <GlobalHeader/>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>

</template>

<style lang="scss" scoped>
</style>
