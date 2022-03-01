<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          CSTCloud
          Universal Service Portal
          @cnic/main
        </q-toolbar-title>

        <q-btn
          color="positive"
          label="/"
          @click="window.location.href='/'"
        />

        <q-btn
          color="positive"
          label="/my/server"
          @click="window.location.href='/my/server'"
        />

        <div>Quasar v{{ $q.version }}</div>

      </q-toolbar>
    </q-header>

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
