<script setup lang="ts">
// import { ref, computed } from "vue"
// import { navigateToUrl } from 'single-spa'
// import { userStore } from 'stores/store'
// import { useRoute, useRouter } from 'vue-router'
import { i18n } from 'boot/i18n'

// const props = defineProps({
//   foo: {
//     type: String,
//     required: false,
//     default: ''
//   }
// })
// const emits = defineEmits(['change', 'delete'])

// const store = useStore()
// const route = userRoute()
// const router = useRouter()
const { tc } = i18n.global

</script>

<template>
  <div class=" bg-c-blue1 text-white text-center q-pa-md flex flex-center" style="height: 100vh;">
    <div>
      <div style="font-size: 20vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        {{ tc('出错了') }}
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        no-caps
        @click="$router.back"
      >
        {{ tc('返回') }}
      </q-btn>

      <div class="absolute-bottom">
        {{ $appName }}
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
