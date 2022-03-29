<script setup lang="ts">
import { watch, computed, ref } from 'vue'
import useStore from 'src/store'
import { useRoute } from 'vue-router'
import { i18n } from 'boot/i18n'
import { navigateToUrl } from 'single-spa'
import { useQuasar } from 'quasar'

// const props = defineProps({
//   foo: {
//     type: String,
//     required: false,
//     default: ''
//   }
// })
// const emits = defineEmits(['change', 'delete'])

const tc = i18n.global.tc
const store = useStore()
console.log('@cnic/main store:', store.$state)
// the root layout of @cnic/main, load @cnic/main's  store here

const quasar = useQuasar()
const route = useRoute()
const paths = route.path.split('/')
const tab = ref(paths[2] || 'my') // keep selection when reloading

// i18n
// 保持localeModel与i18n模块同步
const localeModel = computed({
  get: () => i18n.global.locale,
  set: newVal => {
    i18n.global.locale = newVal
  }
})

const localeOptions = [
  {
    value: 'zh',
    label: '中文'
  },
  {
    value: 'en',
    label: 'English'
  }
]

// 根据localeModel改变Quasar Language Pack
watch(localeModel, value => {
  // 因本地i18n简化为zh和en，此处应补全为'zh-CN'和'en-US'共quasar寻址使用
  const locale = value.includes('zh') ? 'zh-CN' : 'en-US'
  void import('quasar/lang/' + locale).then(lang => {
    // eslint-disable-next-line
    quasar.lang.set(lang.default)
  })

  // dispatch global i18n event. Listened at micro-app's boot/i18n
  window.dispatchEvent(new CustomEvent('i18n', { detail: i18n.global.locale }))
})
</script>

<template>
  <q-layout view="lHh Lpr lFf" style="min-height: 0 !important;">

    <q-header bordered class="bg-white">

      <q-toolbar style="height: 60px">

        <q-toolbar-title shrink>
          <div class="text-black">一体化云服务平台</div>
        </q-toolbar-title>

        <q-space/>

        <q-tabs
          v-model="tab"
          dense
          shrink
          no-caps
          class="text-black"
          active-color="primary"
          style="height: 60px"
          :breakpoint="-1"
        >
          <q-tab class="q-px-sm"
                 name="my"
                 :ripple="false"
                 @click="navigateToUrl('/my')">
            {{ tc('首页') }}
          </q-tab>
          <q-tab class="q-px-sm"
                 name="server"
                 :ripple="false"
                 @click="navigateToUrl('/my/server')">
            {{ tc('云主机') }}
          </q-tab>
          <q-tab class="q-px-sm"
                 name="storage"
                 :ripple="false"
                 @click="navigateToUrl('/my/storage')">
            {{ tc('对象存储') }}
          </q-tab>
          <q-tab class="q-px-sm"
                 name="bill"
                 :ripple="false"
                 @click="navigateToUrl('/my/bill')">
            {{ tc('用量账单') }}
          </q-tab>
          <q-tab class="q-px-sm"
                 name="monitor"
                 :ripple="false"
                 @click="navigateToUrl('/my/monitor')">
            {{ tc('综合监控') }}
          </q-tab>
        </q-tabs>

        <div class="row items-center q-gutter-x-lg">

          <div class="q-gutter-md row items-center no-wrap">
            <q-select
              v-model="localeModel"
              :options="localeOptions"
              dense
              borderless
              emit-value
              map-options
              options-dense
            >
              <template v-slot:prepend>
                <q-icon name="language"/>
              </template>
            </q-select>
          </div>

          <q-btn class="text-black" @click="store.userLogout">登出</q-btn>

        </div>

      </q-toolbar>

    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<style lang="scss" scoped>
.MyLayout {
}
</style>
