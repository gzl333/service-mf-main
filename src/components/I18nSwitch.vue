<script setup lang="ts">
import { watch, computed } from 'vue'
// import { navigateToUrl } from 'single-spa'
// import { useStore } from 'stores/store'
// import { useRoute } from 'vue-router'
import { i18n } from 'boot/i18n'
import { useQuasar } from 'quasar'

/*
const props =
*/
defineProps({
  isDark: {
    type: Boolean,
    required: false,
    default: false
  }
})
// const emits = defineEmits(['change', 'delete'])

// const store = useStore()
// const route = userRoute()
// const tc = i18n.global.tc
const quasar = useQuasar()

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

  // set quasar language set locale
  void import('quasar/lang/' + locale).then(lang => {
    quasar.lang.set(lang.default)
  })

  // store locale preference in localStorage : 'zh' / 'en'
  localStorage.setItem('usp_locale', locale.slice(0, 2))

  // dispatch global i18n event. Listened at micro-app's boot/i18n
  window.dispatchEvent(new CustomEvent('i18n', { detail: i18n.global.locale }))

  // set global i18n record on window object. This for all applications to read during their init.
  window.i18n = i18n.global.locale
})

</script>

<template>

  <q-select
    :dark="isDark"
    :color="isDark ? 'white' : 'primary'"
    :popup-content-class="isDark  ? 'bg-transparent':''"
    v-model="localeModel"
    :options="localeOptions"
    dense
    borderless
    emit-value
    map-options
    options-dense
  >
    <template v-slot:prepend>
      <q-icon name="language" :color="isDark ? 'white' : ''"/>
    </template>

    <template v-if="isDark" v-slot:selected-item="scope">
      <div class="text-white">
        {{ scope.opt.label }}
      </div>
    </template>

  </q-select>

</template>

<style lang="scss" scoped>
</style>
