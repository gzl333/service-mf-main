<script setup lang="ts">
// import { ref, computed } from "vue"
// import { useStore } from 'stores/store'
import { navigateToUrl } from 'single-spa'
import { i18n } from 'boot/i18n'

const tc = i18n.global.tc

// const props = defineProps({
//   foo: {
//     type: String,
//     required: false,
//     default: ''
//   }
// })
// const emits = defineEmits(['change', 'delete'])

// const store = useStore()

// code starts...
</script>

<template>
  <!--  <q-page>-->
  <!-- /my 布局下每个页面都要自己添加q-scroll-area，不能写在router-view.否则其它application会带空白区域-->
  <q-scroll-area style="height: 100vh">
    <div class="MyPage" style="height: 100vh">
      登录后的首页：全局统计信息，快捷方式

      <div class="q-pa-md row items-start q-gutter-lg">
        <q-card class="my-card" style="width: 250px;">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">{{ tc('云主机') }}</div>
            <div class="text-subtitle2">统计信息</div>
          </q-card-section>

          <q-separator/>

          <q-card-actions align="right">
            <q-btn flat @click="navigateToUrl('/my/server')">goto {{ tc('云主机') }}</q-btn>
            <q-btn flat @click="navigateToUrl('/my/server/group')">goto {{ tc('云主机') }}group</q-btn>
          </q-card-actions>
        </q-card>

        <q-card class="my-card" style="width: 250px;">
          <q-card-section class="bg-green text-white">
            <div class="text-h6">{{ tc('对象存储') }}</div>
            <div class="text-subtitle2">统计信息</div>
          </q-card-section>

          <q-card-actions align="around">
            <q-btn flat @click="navigateToUrl('/my/storage')">goto {{ tc('对象存储') }}</q-btn>
            <q-btn flat @click="navigateToUrl('/my/storage/service2')">goto {{ tc('对象存储') }}service2</q-btn>
          </q-card-actions>
        </q-card>

        <q-card class="my-card" style="width: 250px;">
          <q-card-section class="bg-teal text-white">
            <div class="text-h6">{{ tc('高性能计算') }}</div>
            <div class="text-subtitle2">统计信息</div>
          </q-card-section>

          <q-card-actions vertical align="right">
            <q-btn flat @click="navigateToUrl('/my/hpc')">goto {{ tc('高性能计算') }}</q-btn>
            <q-btn flat @click="navigateToUrl('/my/hpc/service2')">goto {{ tc('高性能计算') }} service2</q-btn>
          </q-card-actions>
        </q-card>

        <q-card class="my-card" style="width: 250px;">
          <q-card-section class="bg-grey-8 text-white">
            <div class="text-h6">{{ tc('用量账单') }}</div>
            <div class="text-subtitle2">统计信息</div>
          </q-card-section>

          <q-card-actions vertical align="center">
            <q-btn flat @click="navigateToUrl('/my/stats')">goto {{ tc('用量账单') }}</q-btn>
            <q-btn flat @click="navigateToUrl('/my/stats/service2')">goto {{ tc('用量账单') }} service2</q-btn>
          </q-card-actions>
        </q-card>
      </div>

      <q-card class="my-card" style="width: 250px;">
        <q-card-section class="bg-grey-8 text-white">
          <div class="text-h6">{{ tc('综合监控') }}</div>
          <div class="text-subtitle2">统计信息</div>
        </q-card-section>

        <q-card-actions vertical align="center">
          <q-btn flat @click="navigateToUrl('/my/monitor')">goto {{ tc('综合监控') }}</q-btn>
          <q-btn flat @click="navigateToUrl('/my/monitor/storage')">goto {{ tc('综合监控') }} storage</q-btn>
        </q-card-actions>
      </q-card>

    </div>

  </q-scroll-area>
  <!--  </q-page>-->
</template>

<style lang="scss" scoped>
.MyPage {
}
</style>
