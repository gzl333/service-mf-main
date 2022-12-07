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

// const quasar = useQuasar()

// const route = useRoute()
// const paths = route.path.split('/')
const currentApp = computed(() => store.items.currentApp) // keep selection when reloading

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

        <div class="row full-height items-center q-pr-xs">
          <q-btn flat no-caps dense :ripple="false"
                 class="full-height q-mx-xs"
                 :class="currentApp === 'server' ? 'active-btn':'inactive-btn'"
                 @click="navigateToUrl('/my/server')">
            {{ tc('云主机') }}
          </q-btn>
          <q-btn flat no-caps dense :ripple="false"
                 class="full-height q-mx-xs"
                 :class="currentApp === 'storage' ? 'active-btn':'inactive-btn'"
                 @click="navigateToUrl('/my/storage')">
            {{ tc('对象存储') }}
          </q-btn>
          <!--          <q-btn flat no-caps dense :ripple="false"-->
          <!--                 class="full-height q-mx-xs"-->
          <!--                 :class="currentApp === 'hpc' ? 'active-btn':'inactive-btn'"-->
          <!--                 @click="navigateToUrl('/my/hpc')">-->
          <!--            {{ tc('高性能计算') }}-->
          <!--          </q-btn>-->
          <!--          <q-btn flat no-caps dense :ripple="false"-->
          <!--                 class="full-height q-mx-xs"-->
          <!--                 :class="currentApp === 'public' ? 'active-btn':'inactive-btn'"-->
          <!--                 @click="navigateToUrl('/my/public')">-->
          <!--            {{ tc('中国科技云公共服务平台') }}-->
          <!--          </q-btn>-->
          <q-btn flat no-caps dense :ripple="false"
                 class="full-height q-mx-xs"
                 :class="currentApp === 'stats' ? 'active-btn':'inactive-btn'"
                 @click="navigateToUrl('/my/stats')">
            {{ tc('用量账单') }}
          </q-btn>
          <q-btn flat no-caps dense :ripple="false"
                 class="full-height q-mx-xs"
                 :class="currentApp === 'monitor' ? 'active-btn':'inactive-btn'"
                 @click="navigateToUrl('/my/monitor')">
            {{ tc('综合监控') }}
          </q-btn>
          <q-btn flat no-caps dense :ripple="false"
                 class="full-height q-mx-xs"
                 :class="currentApp === 'wallet' ? 'active-btn':'inactive-btn'"
                 @click="navigateToUrl('/my/wallet')">
            {{ tc('钱包') }}
          </q-btn>
          <q-btn flat no-caps dense :ripple="false"
                 class="full-height q-mx-xs"
                 :class="currentApp === 'support' ? 'active-btn':'inactive-btn'"
                 @click="navigateToUrl('/my/support')">
            {{ tc('用户支持') }}
          </q-btn>

          <q-btn-dropdown
            class="full-height q-mx-xs"
            :class="currentApp === 'hpc' || currentApp === 'public' ? 'active-btn':'inactive-btn'"
            :color="currentApp === 'hpc' || currentApp === 'public' ? 'primary':'black'"
            :ripple="false"
            flat
            dense
            no-caps
            :label="tc('更多')"
          >
            <q-list>
              <q-item clickable v-close-popup @click="navigateToUrl('/my/hpc')">
                <q-item-section>
                  <q-item-label  :class="currentApp === 'hpc' ? 'text-primary':''">{{ tc('高性能计算') }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="navigateToUrl('/my/public')">
                <q-item-section>
                  <q-item-label :class="currentApp === 'public' ? 'text-primary':''">{{ tc('中国科技云公共服务平台') }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>

        </div>

        <div class="row items-center q-gutter-x-none">

          <div class="q-gutter-md row items-center no-wrap">
            <i18n-switch :is-dark="false"/>
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
                 style="min-width: 200px;background-color: #245099;">
              <div class="column items-center">
                <q-icon class="q-pt-lg q-pb-none q-ma-none" name="mdi-account" color="white" size="90px"/>

                <div class="text-subtitle1  text-white no-wrap">{{ store.items.tokenDecoded.name }}</div>
                <div class="text-subtitle1 text-white no-wrap">{{ store.items.tokenDecoded.orgName }}</div>

                <div class="q-pt-sm text-caption text-grey-5">
                  {{ store.items.loginType === 'passport' ? tc('使用科技云通行证登录') : tc('使用科技云AAI登录') }}
                </div>
              </div>
            </div>

            <q-list class="non-selectable" style="text-align: center">
              <!--              <q-item clickable disable>-->
              <!--                <q-item-section>账户设置</q-item-section>-->
              <!--              </q-item>-->

              <q-item v-if="store.items.loginType === 'passport'"
                      clickable
                      tag="a"
                      href="https://passport.escience.cn/user/password.do?act=showChangePassword"
                      target="_blank">
                <q-item-section>{{ tc('修改密码') }}</q-item-section>
              </q-item>

              <q-item clickable @click="store.userLogout" class="bg-grey-2">
                <q-item-section>{{ tc('退出登录') }}</q-item-section>
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

.active-btn {
  color: $primary;
  border-bottom: 2px solid $primary;
  border-radius: 0;
}

.inactive-btn {
  color: black;
  border-radius: 0;
}
</style>
