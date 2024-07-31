<script setup>
import { BankOutlined, BookOutlined, EnvironmentOutlined } from '@ant-design/icons-vue'
import UserCard from '../components/UserCard.vue'
import Items from '../components/Items.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getProfile, getPostsById } from '../apis/api.js'

onMounted(() => {
  getProfile(route.params.id).then(res => {
    userData.value = res.data.data
    getPostsById(userData.value.userId).then(res => {
      data.value = res.data.data.rows
    })
  })
})

const route = useRoute()
const userData = ref({})
const data = ref([])

</script>

<template>
  <div class="max-w-250 m-0 m-auto flex">

    <div>
      <UserCard :userData="userData">
        <div class="my-8 flex justify-around">
          <div><a-button type="primary" size="large"><router-link to="/editor">发 布 文 章</router-link></a-button></div>
          <div><a-button size="large">修 改 信 息</a-button></div>
        </div>

        <div class="pl-1/8">
          <p><bank-outlined /><span class="ml-2">{{ userData.school }}</span></p>
          <p><book-outlined /><span class="ml-2">{{ userData.major }}</span></p>
          <p><environment-outlined /><span class="ml-2">{{ userData.address }}</span></p>
        </div>
      </UserCard>
    </div>

    <div class="w-3/5 mx-8">
      <Items path="posts" :data="data" />
    </div>

  </div>
</template>

<style scoped></style>