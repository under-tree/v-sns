<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const userData = ref({
  nickname: 'JY',
  nUpvote: 110,
  nPost: 119,
  nComment: 120,
})

const noticesData = ref([
  { title: '关于举办某某活动的通知' },
  { title: '关于召开某某会议的通知' },
  { title: '关于开设某某课程的通知' },
])

</script>

<template>

  <UserCard :userData="userData" @click-avatar="router.push('/user')">
    <div class="my-8 flex justify-around">
      <div><a-button type="primary" size="large"><router-link to="/editor">发 布 文 章</router-link></a-button></div>
      <div><a-button size="large">退 出 登 录</a-button></div>
    </div>
  </UserCard>

  <div class="h-8"></div>

  <div class="rounded-xl shadow-2xl">
    <a-card title="公告">
      <p v-for="item in noticesData">{{ item.title }}</p>
    </a-card>
  </div>

</template>

<style scoped></style>