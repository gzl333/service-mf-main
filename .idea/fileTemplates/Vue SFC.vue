<template>
  <div class="${NAME}">
    this is ${NAME}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: '${NAME}',
  components: {
  },
  props: {
  },
  setup () {
    return{
    }
  }
})
</script>

<style lang="scss" scoped>
.${NAME} {
}
</style>