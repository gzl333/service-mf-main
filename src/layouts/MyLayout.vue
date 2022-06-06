<script setup lang="ts">
import { watch, computed/* , ref  */ } from 'vue'
import { useStore } from 'stores/store'
// import { useRoute } from 'vue-router'
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

// const route = useRoute()
// const paths = route.path.split('/')
const currentApp = computed(() => store.items.currentApp) // keep selection when reloading

const gotoManual = () => {
  // 中文访问/manual 英文访问/manual/en
  const url = computed(() => location.origin + (i18n.global.locale === 'zh' ? '/manual' : '/manual/en'))
  window.open(url.value)
}

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
  // set global i18n record on window object
  window.i18n = i18n.global.locale
})

const releaseTime = process.env.releaseTime
</script>

<template>
  <q-layout view="lHh Lpr lFf" style="min-height: 0 !important; min-width: 1350px !important;">

    <q-header elevated class="bg-grey-2" style="min-width: 1350px;">

      <q-toolbar style="height: 60px">

        <q-toolbar-title shrink>
          <div class="row items-center no-wrap">
            <img src="../assets/cstcloud_logo.png" style="height: 40px;"/>
            <div class="text-grey-8 text-weight-bold">{{ tc('一体化云服务平台') }}</div>
          </div>

        </q-toolbar-title>

        <q-icon name="info" color="grey" size="xs">
          <q-tooltip>
            release time: {{ new Date(releaseTime).toLocaleString() }}
          </q-tooltip>
        </q-icon>

        <q-space/>

        <!--        可以改用btn-toggle-->
        <q-tabs
          id="header-tabs"
          class="text-black q-pr-xl"
          style="height: 60px;"
          v-model="currentApp"
          dense
          shrink
          no-caps
          active-color="primary"
        >
<!--          <q-tab class="q-px-sm"-->
<!--                 style="min-width: 30px !important;"-->
<!--                 name="my"-->
<!--                 :ripple="false"-->
<!--                 @click="navigateToUrl('/my')">-->
<!--            {{ tc('首页') }}-->
<!--          </q-tab>-->
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
                 name="hpc"
                 :ripple="false"
                 @click="navigateToUrl('/my/hpc')">
            {{ tc('高性能计算') }}
          </q-tab>
          <q-tab class="q-px-sm"
                 name="stats"
                 :ripple="false"
                 @click="navigateToUrl('/my/stats')">
            {{ tc('用量账单') }}
          </q-tab>
          <q-tab class="q-px-sm"
                 name="monitor"
                 :ripple="false"
                 @click="navigateToUrl('/my/monitor')">
            {{ tc('综合监控') }}
          </q-tab>
        </q-tabs>

        <div class="row items-center q-gutter-x-none">

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

          <q-btn class="text-weight-regular" color="grey-8" :ripple="false" flat dense no-caps no-wrap
                 icon="mdi-book-open-outline" @click="gotoManual">
            {{ tc('使用手册') }}
          </q-btn>

          <q-btn-dropdown :ripple="false" flat class="q-py-none q-px-none text-weight-regular" color="grey-8" no-caps>

            <template v-slot:label>
              <q-icon name="las la-user-circle"/>
              {{ store.items.tokenDecoded.email }}
            </template>

            <div class="row justify-center no-wrap q-pa-md non-selectable"
                 style="  min-width: 200px;background-color: #245099;">
              <div class="column items-center">
                <q-icon class="q-pt-lg q-pb-none q-ma-none" name="mdi-account" color="white" size="90px"/>

                <div class="text-subtitle1  text-white no-wrap">{{ store.items.tokenDecoded.name }}</div>
                <div class="text-subtitle1 text-white no-wrap">{{ store.items.tokenDecoded.orgName }}</div>

                <div class="q-pt-sm text-caption text-grey-5">
                  {{ store.items.loginType === 'aai' ? tc('使用科技云AAI联盟登录') : tc('使用科技云通行证登录') }}
                </div>
              </div>
            </div>

            <q-list class="non-selectable" style="text-align: center">
              <!--              <q-item clickable disable>-->
              <!--                <q-item-section>账户设置</q-item-section>-->
              <!--              </q-item>-->
              <q-item clickable tag="a" href="https://passport.escience.cn/user/password.do?act=showChangePassword"
                      target="_blank">
                <q-item-section>修改密码</q-item-section>
              </q-item>
              <q-item clickable @click="store.userLogout" class="bg-grey-2">
                <q-item-section>退出登录</q-item-section>
              </q-item>
            </q-list>

          </q-btn-dropdown>

        </div>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view style="min-width: 1350px;"/>
    </q-page-container>

  </q-layout>
</template>

<style lang="scss" scoped>
.MyLayout {
}

#header-tabs {
  .q-tab__content {
    min-width: 44px !important;
  }
}

</style>
