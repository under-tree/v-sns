<script setup>
import { BankOutlined, BookOutlined, EnvironmentOutlined } from '@ant-design/icons-vue'
import UserCard from '../components/UserCard.vue'
import Items from '../components/Items.vue'
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getProfile, getPostsById, getJobsById, getResourcesById } from '../apis/api.js'

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
const current = ref(['posts'])
const items = ref([
  {
    key: 'posts',
    label: '文章',
  },
  {
    key: 'job',
    label: '内推',
  },
  {
    key: 'resource',
    label: '资源',
  },
])

watch(current, x => {
  if (x[0] === 'posts') {
    getPostsById(userData.value.userId).then(res => {
      data.value = res.data.data.rows
    })
  } else if (x[0] === 'job') {
    getJobsById(userData.value.userId).then(res => {
      data.value = res.data.data.rows
    })
  } else if (x[0] === 'resource') {
    getResourcesById(userData.value.userId).then(res => {
      data.value = res.data.data.rows
    })
  }
})

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
      <a-menu class="mb-4 rounded-xl shadow-2xl" v-model:selectedKeys="current" mode="horizontal" :items="items" />

      <Items :path="current" :data="data" />
    </div>

  </div>
</template>

<style scoped></style>