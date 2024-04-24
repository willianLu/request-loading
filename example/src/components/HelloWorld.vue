<script setup lang="ts">
import Loading from "../../../lib/index"
defineProps<{ msg: string }>();
Loading.setConfig({
  icon: "dot"
})

function handleTest() {
  Loading.show()
  console.log("=========点击测试")
  setTimeout(() => {
    Loading.hide()
  }, 5000)
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <button @click="handleTest" style="cursor:pointer;position: relative;z-index:10000;">点击测试</button>
</template>
<style scoped>
.read-the-docs {
  color: #888;
}
</style>
