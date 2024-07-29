<script setup>
import { ref } from 'vue'
import { BankOutlined, BookOutlined, HomeOutlined } from '@ant-design/icons-vue'
import UserCard from '../components/UserCard.vue'
import ItemList from '../components/ItemList.vue'

const userData = ref({
  nickname: 'JY',
  nUpvote: 110,
  nPost: 119,
  nComment: 120,
  school: '中山大学',
  major: '计算机科学与技术',
  address: '深圳市 - 南山区',

})

</script>

<template>
  <div class="max-w-250 m-0 m-auto flex">

    <div>
      <UserCard :userData="userData">
        <div class="my-8 flex justify-around">
          <div><a-button type="primary" size="large">关 注 用 户</a-button></div>
          <div><a-button size="large">联 系 方 式</a-button></div>
        </div>

        <div class="pl-1/8">
          <p><bank-outlined /><span class="ml-2">{{ userData.school }}</span></p>
          <p><book-outlined /><span class="ml-2">{{ userData.major }}</span></p>
          <p><home-outlined /><span class="ml-2">{{ userData.address }}</span></p>
        </div>
      </UserCard>
    </div>

    <div class="w-3/5 mx-8">
      <ItemList />
    </div>

  </div>
</template>

<style scoped></style>