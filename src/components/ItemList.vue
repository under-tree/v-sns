<script setup>
import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getPosts } from '../apis/api'

onMounted(() => {
  getPosts(page.value).then(res => {
    data.value = res.data.data.rows
  })
})

function nextPage() {
  page.value += 1
  getPosts(page.value).then(res => {
    data.value = res.data.data.rows
  })
}

function prevPage() {
  if (page.value > 1) {
    page.value -= 1
  }
  getPosts(page.value).then(res => {
    data.value = res.data.data.rows
  })
}

const router = useRouter()
const data = ref([])
const page = ref(1)
</script>

<template>
  <div class="h-25 mb-4 flex rounded-xl hover:shadow-2xl bg-white" v-for="item in data" :key="item.id">

    <div class="ml-10 m-auto">
      <div class="text-xl hover:cursor-pointer" @click="router.push(`/posts/${item.id}`)">{{ item.title }}</div>

      <div class="mt-4 text-neutral-500">
        <eye-outlined />
        {{ item.nBrowse }}
        <a-divider type="vertical" />
        <like-outlined />
        {{ item.nUpvote }}
        <a-divider type="vertical" />
        <message-outlined />
        {{ item.nComment }}
      </div>
    </div>

    <div class="mr-10 m-auto">
      <a-image :width="64" :height="64" :src="item.coverPicture" />
    </div>

  </div>

  <div>
    <a-button class="mr-2" @click="prevPage">上一页</a-button>
    <a-button @click="nextPage">下一页</a-button>
  </div>
</template>

<style scoped></style>