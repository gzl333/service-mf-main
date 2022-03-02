<template>
  <q-layout view="hHh lpR fFf" style="min-height: 0px !important;">
    <q-header elevated reveal>
      <q-toolbar>

        <q-toolbar-title>
          CSTCloud
          Universal Service Portal
          @cnic/main
        </q-toolbar-title>

        <a href="/">goto /</a>

        <a href="/my">goto /my</a>

        <a href="/my/server">goto /my/server</a>

        <a href="/my/server/good">goto /my/server/good</a>

        <div>Quasar v{{ $q.version }}</div>

      </q-toolbar>
    </q-header>

<!--    <q-page-container>-->
<!--      <router-view></router-view>-->
<!--    </q-page-container>-->

  </q-layout>
</template>

<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
  },
  setup () {
    return {
    }
  }
})
</script>
