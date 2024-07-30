<script setup>
import { ref, computed, reactive } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { marked } from 'marked'
import { postPost } from '../apis/api'


const inputContainer = ref(null)
const input = useLocalStorage('vsns-editor', '')
const output = computed(() => marked(input.value))

function handlePaste(e) {
  const items = e.clipboardData.items
  for (let item of items) {
    if (item.kind === 'file' && item.type.startsWith('image/')) {
      const file = item.getAsFile()
      const reader = new FileReader()
      reader.onload = function (e) {
        const base64Image = e.target.result
        const markdownImage = `![Image](${base64Image})`
        insertAtCursor(inputContainer.value, markdownImage)
        input.value += markdownImage
      }
      reader.readAsDataURL(file)
    }
  }
}

function insertAtCursor(field, value) {
  if (document.selection) {
    field.focus()
    const sel = document.selection.createRange()
    sel.text = value
  } else if (field.selectionStart || field.selectionStart === 0) {
    const startPos = field.selectionStart
    const endPos = field.selectionEnd
    field.value = field.value.substring(0, startPos) + value + field.value.substring(endPos, field.value.length)
  } else {
    field.value += value
  }
}

const openPost = ref(false)
const openJob = ref(false)
const data = reactive({
  title: '',
  descriptions: '',
})

const showPostModal = () => {
  openPost.value = true
}

const onPostFinish = () => {
  openPost.value = false
  postPost(data.title, input.value).then(res=>{console.log(res)})
}

const showJobModal = () => {
  openJob.value = true
}

const onJobFinish = () => {
  openJob.value = false
  postJob(data.title, input.value).then(res=>{console.log(res)})
}

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo)
}
</script>

<template>

  <div class="editor">
    <textarea class="input" ref="inputContainer" v-model="input" @paste="handlePaste"></textarea>
    <div class="markdown-body output" v-html="output"></div>
  </div>

  <div class="flex mb-10">
    <div class="mr-8 m-auto">
      <a-button type="primary" @click="showPostModal">发布文章</a-button>
      <a-button class="ml-4" @click="showJobModal">设为内推</a-button>
    </div>
  </div>

  <a-modal v-model:open="openPost" title="发布文章" :footer="null">

    <div class="h-8"></div>

    <a-form
      :model="data"
      name="basic"
      autocomplete="off"
      @finish="onPostFinish"
      @finishFailed="onFinishFailed"
    >

      <a-form-item label="标题" name="title" :rules="[{ required: true, message: '请输入标题！' }]">
        <a-input v-model:value="data.title" />
      </a-form-item>

      <a-form-item label="描述" name="descrption" :rules="[{ required: true, message: '请输入描述！' }]">
        <a-input v-model:value="data.descrption" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 10, span: 16 }">
        <a-button type="primary" html-type="submit">发布</a-button>
      </a-form-item>

    </a-form>

  </a-modal>

  <a-modal v-model:open="openJob" title="发布内推" :footer="null">

    <div class="h-8"></div>

    <a-form
      :model="data"
      name="basic"
      autocomplete="off"
      @finish="onJobFinish"
      @finishFailed="onFinishFailed"
    >

      <a-form-item label="标题" name="title" :rules="[{ required: true, message: '请输入标题！' }]">
        <a-input v-model:value="data.title" />
      </a-form-item>

      <a-form-item label="描述" name="descrption" :rules="[{ required: true, message: '请输入描述！' }]">
        <a-input v-model:value="data.descrption" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 10, span: 16 }">
        <a-button type="primary" html-type="submit">发布</a-button>
      </a-form-item>

    </a-form>

  </a-modal>

</template>


<style scoped>
.editor {
  height: 80vh;
  display: flex;
  margin: 20px;
}

.input,
.output {
  overflow: auto;
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px 20px;
}

.input {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
}
</style>