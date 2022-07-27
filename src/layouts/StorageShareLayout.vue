<script setup lang="ts">
import { /* watch, */ computed/* , ref  */ } from 'vue'
import { useStore } from 'stores/store'
// import { useRoute } from 'vue-router'
import { i18n } from 'boot/i18n'
import { navigateToUrl } from 'single-spa'
// import { useQuasar } from 'quasar'

import I18nSwitch from 'components/I18nSwitch.vue'

// const props = defineProps({
//   foo: {
//     type: String,
//     required: false,
//     default: ''
//   }
// })
// const emits = defineEmits(['change', 'delete'])
const { tc } = i18n.global
const store = useStore()
console.log('@cnic/main store:', store.$state)
// the root layout of @cnic/main, load @cnic/main's  store here

const gotoManual = () => {
  // 中文访问/manual 英文访问/manual/en
  const url = computed(() => location.origin + (i18n.global.locale === 'zh' ? '/manual' : '/manual/en'))
  window.open(url.value)
}

const releaseTime = process.env.releaseTime
</script>

<template>
  <q-layout view="lHh Lpr lFf" style="min-height: 0 !important; min-width: 1350px !important;">

    <q-header elevated class="bg-grey-2" style="min-width: 1350px;">

      <q-toolbar style="height: 60px">

        <q-toolbar-title class="cursor-pointer" shrink @click="navigateToUrl('/my')">
          <div class="row items-center no-wrap">
            <img src="../assets/cstcloud_logo.png" style="height: 40px;"/>
            <div class="text-grey-8 text-weight-bold">{{ tc('一体化云服务平台') }}</div>
          </div>
        </q-toolbar-title>

        <q-icon name="info" color="grey-5" size="xs">
          <q-tooltip>
            发布时间: {{ new Date(releaseTime).toLocaleString() }}
          </q-tooltip>
        </q-icon>

        <q-space/>

        <div class="row items-center q-gutter-x-none">

          <div class="q-gutter-md row items-center no-wrap">
            <i18n-switch :is-dark="false"/>
          </div>

          <q-btn class="text-weight-regular" color="grey-8" :ripple="false" flat dense no-caps no-wrap
                 icon="mdi-book-open-outline" @click="gotoManual">
            {{ tc('使用手册') }}
          </q-btn>

        </div>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view style="min-width: 1350px;"/>
    </q-page-container>

  </q-layout>
</template>

<style lang="scss" scoped>
.StorageShareLayout {
}
</style>
