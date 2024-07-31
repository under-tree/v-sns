<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getActivities } from '../apis/api'

onMounted(() => {
  getActivities().then(res => {
    data.value = res.data.data.rows
  })
})

const router = useRouter()
const data = ref([])

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
      <div class="w-55 h-40 mx-2 mb-4" v-for="item in data">
        <img class="w-full h-full shadow-2xl rounded-xl hover:cursor-pointer" :src="item.coverPicture" @click="router.push(`/activity/${item.id}`)">
      </div>
    </div>

  </div>

</template>

<style scoped></style>