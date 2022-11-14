<script setup lang="ts">
// import { ref, computed } from "vue"
// import { navigateToUrl } from 'single-spa'
import { useStore } from 'stores/store'
// import { useRoute } from 'vue-router'
import { i18n } from 'boot/i18n'
import { navigateToUrl } from 'single-spa'
// import I18nSwitch from 'components/I18nSwitch.vue'

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
// const route = userRoute()

</script>

<template>
  <div class="HeaderContent">

    <div class="column justify-center items-center" style="height: 100px;">

      <div class="row justify-between items-center no-wrap content-fixed-width">
        <div class="col-auto row items-center cursor-pointer" shrink @click="navigateToUrl('/')">
          <img src="../assets/cstcloud_logo.png" style="height: 50px;"/>
          <div class="text-grey-3 text-h5">{{ tc('一体化云服务平台') }}</div>
        </div>

        <div class="col-auto row">

<!--          <I18nSwitch class="q-mr-lg" :is-dark="true"/>-->

          <q-btn class="q-mr-lg gt-xs" flat :ripple="false" color="white" type="a" no-caps dense
                 href="https://passport.escience.cn/regist.jsp"
                 target="_blank">
            {{ tc('注册') }}
          </q-btn>

          <q-btn flat
                 dense
                 :ripple="false"
                 color="white"
                 no-caps
                 @click="store.askUrl('passport')"
          >
            {{ tc('科技云通行证登录') }}
          </q-btn>

          <q-btn-dropdown
            class="transparent"
            content-class="transparent"
            flat
            dense
            no-caps
            auto-close
            padding="none"
            :ripple="false"
            color="grey-1"
          >
            <q-btn
              class="full-width transparent"
              flat
              :ripple="false"
              text-color="white"
              no-caps
              @click="store.askUrl('aai')">
              {{ tc('科技云AAI登录') }}
            </q-btn>
          </q-btn-dropdown>

        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.HeaderContent {
}
</style>
