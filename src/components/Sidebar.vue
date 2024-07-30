<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTokenStore } from '../stores/user.js'
import { getProfile } from '../apis/api.js'
import { getNotices } from '../apis/api.js'

onMounted(() => {
  getProfile().then(res => {
    userData.value = res.data.data
  })

  getNotices().then(res => {
    noticesData.value = res.data.data.rows
  })
})

const router = useRouter()
const { isLogin, setToken } = useTokenStore()

const userData = ref({})
const noticesData = ref([])

const onSignOut = () => {
  setToken('')
  location.reload()
}

</script>

<template>

  <UserCard v-if="isLogin" class="mb-8" :userData="userData" @click-avatar="router.push('/user')">
    <div class="my-8 flex justify-around">
      <div><a-button type="primary" size="large"><router-link to="/editor">发 布 文 章</router-link></a-button></div>
      <div><a-button size="large" @click="onSignOut">退 出 登 录</a-button></div>
    </div>
  </UserCard>

  <div v-else class="h-20 mb-8 rounded-xl shadow-2xl bg-white flex">
    <p class="m-auto">登录查看更多内容</p>
  </div>

  <div class="w-80 rounded-xl shadow-2xl">
    <a-card title="公告">
      <p v-for="item in noticesData">{{ item.title }}</p>
    </a-card>
  </div>

</template>

<style scoped></style>