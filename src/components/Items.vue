<script setup>
import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'

defineProps(['path', 'data'])

const router = useRouter()
</script>

<template>
  <div class="h-25 mb-4 flex rounded-xl hover:shadow-2xl bg-white" v-for="item in data" :key="item.id">

    <div class="ml-10 m-auto">
      <div class="text-xl hover:cursor-pointer" @click="router.push(`/${path}/${item.id}`)">{{ item.title }}</div>

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

</template>

<style scoped></style>