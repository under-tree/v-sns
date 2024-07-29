<script setup>
import ItemList from '../components/ItemList.vue'
import Sidebar from '../components/Sidebar.vue'
</script>

<template>
  <div class="max-w-250 m-0 m-auto flex">

    <main class="w-3/5 mx-8">
      <ItemList />
    </main>

    <div>
      <Sidebar />
    </div>

  </div>
</template>

<style scoped></style>