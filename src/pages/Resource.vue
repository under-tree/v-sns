<script setup>
import Items from '../components/Items.vue'
import { ref, onMounted } from 'vue'
import { getResources } from '../apis/api.js'

onMounted(() => {
  getResources().then(res => {
    data.value = res.data.data.rows
  })
})

const data = ref([])

</script>

<template>
  <div class="max-w-150 m-0 m-auto">
    <Items path="resource" :data="data" />
  </div>
</template>

<style scoped></style>