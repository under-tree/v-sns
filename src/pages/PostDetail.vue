<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { getPost } from '../apis/api'

onMounted(() => {
  getPost(route.params.id).then(res => {
    data.value = res.data.data
  })
})

const route = useRoute()
const data = ref({ comments: { rows: [] } })

</script>

<template>
  <main class="max-w-180 m-0 m-auto mb-8">

    <div class="markdown-body mb-6 p-6 rounded-xl shadow-2xl bg-white" v-html="marked(data.content || '')"></div>

    <div class="p-6 rounded-xl shadow-2xl bg-white">
      <a-comment v-for="comment in data.comments.rows">

        <template #actions>
          <span key="comment-basic-reply-to">Reply to {{ comment.toNickname }}</span>
        </template>

        <template #author><a>{{ comment.nickname }}</a></template>

        <template #avatar>
          <a-avatar :src="comment.avatar" />
        </template>

        <template #content>
          <p>{{ comment.content }}</p>
        </template>

      </a-comment>
    </div>

  </main>
</template>

<style scoped></style>