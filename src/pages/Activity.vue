<script setup>
import { ref } from 'vue'

const carouselData = ref([
  { coverPicture: '/act-image-1.jpg' },
  { coverPicture: '/act-image-2.jpg' },
  { coverPicture: '/act-image-3.jpg' },
  { coverPicture: '/act-image-4.jpg' },
])

</script>

<template>

  <div class="max-w-180 m-0 m-auto">

    <a-carousel class="w-full" autoplay>
      <div v-for="item in carouselData">
        <img class="w-full h-75" :src="item.coverPicture">
      </div>
    </a-carousel>

    <div class="h-8"></div>

    <div class="flex flex-wrap justify-center">
      <div class="w-55 h-40 mx-2 mb-4" v-for="item in 12">
        <img class="w-full h-full shadow-2xl rounded-xl" src="/poster.jpg">
      </div>
    </div>

  </div>

</template>

<style scoped></style>