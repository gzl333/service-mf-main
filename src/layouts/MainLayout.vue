<template>
  <q-layout view="hHh lpR fFf" style="min-height: 0px !important;">
    <q-header elevated reveal>
      <q-toolbar>

        <q-toolbar-title>
          CSTCloud
          Universal Service Portal
          @cnic/main
        </q-toolbar-title>

        count: {{ count }}

        $store:{{$store.state}}

        <q-btn label="add" @click="count++"/>

        <q-btn label="goto /" @click="jump"/>
        <q-btn label="goto /my" @click="singleSpa.navigateToUrl('/my')"/>
        <q-btn label="goto /my/server" to="/my/server"/>
        <q-btn label="goto /my/server/good" to="/my/server/good"/>

        <a href="/" onclick="singleSpaNavigate(event)">goto /</a>

        <a href="/my" onclick="singleSpaNavigate(event)">goto /my</a>

        <a href="/my/server" onclick="singleSpaNavigate(event)">goto /my/server</a>

        <a href="/my/server/good" onclick="singleSpaNavigate(event)">goto /my/server/good</a>

        <div>Quasar v{{ $q.version }}</div>

      </q-toolbar>
    </q-header>

<!--        <q-page-container>-->
<!--          <router-view></router-view>-->
<!--        </q-page-container>-->

  </q-layout>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue'
import * as singleSpa from 'single-spa'

console.info('@cnic/main Before Layout Setup!')
debugger
export const count = ref(0)

export const getCount = () => count.value

export default defineComponent({
  name: 'MainLayout',
  components: {},
  setup () {
    console.info('@cnic/main In Layout Setup!')

    const jump = () => {
      singleSpa.navigateToUrl('/')
      console.info(singleSpa.getAppNames())
    }

    return {
      singleSpa,
      count,
      jump
    }
  }
})
</script>
