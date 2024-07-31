<script setup>
import { LikeOutlined } from '@ant-design/icons-vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import { getPost, getActivity, getJob, getResource, getNotice, newUpvote, newComment } from '../apis/api'

onMounted(() => {
  if (route.fullPath.startsWith('/posts')) {
    isPost.value = true
    getPost(route.params.id).then(res => {
      data.value = res.data.data
    })
  } else if (route.fullPath.startsWith('/activity')) {
    isActivity.value = true
    getActivity(route.params.id).then(res => {
      data.value = res.data.data
    })
  } else if (route.fullPath.startsWith('/job')) {
    isJob.value = true
    getJob(route.params.id).then(res => {
      data.value = res.data.data
    })
  } else if (route.fullPath.startsWith('/resource')) {
    getResource(route.params.id).then(res => {
      data.value = res.data.data
    })
  } else if (route.fullPath.startsWith('/notice')) {
    getNotice(route.params.id).then(res => {
      data.value = res.data.data
    })
  }
})

const route = useRoute()
const router = useRouter()
const data = ref({ comments: { rows: [] } })
const input = ref('')
const isPost = ref(false)
const isJob = ref(false)
const isActivity = ref(false)

</script>

<template>
  <main class="max-w-180 m-0 m-auto mb-8">

    <div class="mb-6 rounded-xl shadow-2xl bg-white">

      <div class="h-24 flex rounded-xl">

        <h1 class="ml-8 m-auto">{{ data.title }} </h1>

        <a-tooltip placement="left" color="blue">
          <a-avatar class="mr-8 m-auto hover:cursor-pointer" :size="64" :src="data.avatar"
            @click="router.push(`/users/${data.userId}`)" />
          <template #title> 别忘了点赞哦 </template>
        </a-tooltip>

      </div>

      <div class="h-12 flex">

        <div class="ml-12 m-auto">
          <span>{{ data.nickname }}</span> | <span>{{ data.createTime }}</span>
        </div>

        <div class="mr-12 m-auto">
          <like-outlined class="hover:cursor-pointer" @click="newUpvote(data.postId)" />
          {{ data.nUpvote }}
        </div>

      </div>

    </div>

    <div class="markdown-body mb-6 p-6 rounded-xl shadow-2xl bg-white" v-html="marked(data.content || '')"></div>

    <div v-if="isJob" class="flex">
      <div class="mr-8 m-auto">
        <a-button type="primary" @click="">上传简历</a-button>
      </div>
    </div>

    <div v-if="isActivity" class="flex">
      <div class="mr-8 m-auto">
        <a-button type="primary" @click="">参加活动</a-button>
      </div>
    </div>

    <div v-if="isPost" class="h-64 mb-6 rounded-xl shadow-2xl bg-white">
      <a-textarea class="z-1" v-model:value="input" placeholder="发表评论" size="large" :rows="6" />

      <div class="mt-4 flex">
        <a-button class="mr-8 m-auto z-1" type="primary" @click="newComment(input, route.params.id, data.userId)">
          发表
        </a-button>
      </div>
    </div>

    <div v-if="isPost" class="p-6 rounded-xl shadow-2xl bg-white">
      <a-comment v-for="comment in data.comments.rows">

        <template #actions>
          <span key="comment-basic-reply-to">Reply to {{ comment.toNickname }}</span>
        </template>

        <template #author><a>{{ comment.nickname }}</a></template>

        <template #avatar>
          <a-avatar :src="comment.avatar" />
        </template>

        <template #datetime>
          <span>{{ comment.createTime }}</span>
        </template>

        <template #content>
          <p>{{ comment.content }}</p>
        </template>

      </a-comment>
    </div>

  </main>
</template>

<style scoped></style>