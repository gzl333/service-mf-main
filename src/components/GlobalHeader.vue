<script setup lang="ts">
import { watch, computed } from 'vue'
import useStore from 'src/store'
import { useI18n } from 'vue-i18n'
import { navigateToUrl } from 'single-spa'
import { useQuasar } from 'quasar'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { i18nServer } from '@cnic/server'

// const props = defineProps({
//   foo: {
//     type: String,
//     required: false,
//     default: ''
//   }
// })
// const emits = defineEmits(['change', 'delete'])

const store = useStore()
const { locale } = useI18n({ useScope: 'global' })
const $q = useQuasar()

// i18n
// 保持localeModel与i18n模块同步
const localeModel = computed({
  get: () => locale.value,
  set: newVal => {
    locale.value = newVal
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
watch(localeModel, val => {
  // 因本地i18n简化为zh和en，此处应补全为'zh-CN'和'en-US'共quasar寻址使用
  const locale = val.includes('zh') ? 'zh-CN' : 'en-US'
  void import('quasar/lang/' + locale).then(lang => {
    // eslint-disable-next-line
    $q.lang.set(lang.default)
  })

  // 改变其他app的i18n locale
  i18nServer.global.locale = val
})

</script>

<template>

  <q-header bordered reveal>
    <q-toolbar>
      <q-toolbar-title>
        中国科技云统一服务入口
      </q-toolbar-title>

      <q-btn color="positive" @click="navigateToUrl('/')">/</q-btn>
      <q-btn color="positive" @click="navigateToUrl('/my')">my</q-btn>
      <q-btn color="positive" @click="navigateToUrl('/my/server')">server</q-btn>
      <q-btn color="positive" @click="navigateToUrl('/my/storage')">storage</q-btn>

      counter: {{ store.counter }}

      <q-btn @click="store.increment">+1</q-btn>

      <div>{{ $appName }}</div>

      <div class="text-amber">{{ $t('翻译测试') }}</div>

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

    </q-toolbar>
  </q-header>

</template>

<style lang="scss" scoped>
</style>
