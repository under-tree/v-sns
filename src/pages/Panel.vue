<script setup>
import { message } from 'ant-design-vue'
import { BankOutlined, BookOutlined, EnvironmentOutlined, UploadOutlined } from '@ant-design/icons-vue'
import UserCard from '../components/UserCard.vue'
import Items from '../components/Items.vue'
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTokenStore } from '../stores/user.js'
import { getProfile, getPostsById, getJobsById, getResourcesById, postProfile } from '../apis/api.js'

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

const open = ref(false)

const showModal = () => {
  open.value = true
}

const onFinish = () => {
  open.value = false
  if (fileLink.value !== '') {
    userData.value.avatar = fileLink.value
  }
  postProfile(userData.value)
}

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo)
}

const { token } = useTokenStore()
const fileLink = ref('')

const onFileChange = info => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList)
  }
  if (info.file.status === 'done') {
    message.success(`${info.file.name} 文件上传成功`)
    fileLink.value = info.file.response.msg
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} 文件上传失败`)
  }
}
</script>

<template>
  <div class="max-w-250 m-0 m-auto flex">

    <div>
      <UserCard :userData="userData">
        <div class="my-8 flex justify-around">
          <div><a-button type="primary" size="large"><router-link to="/editor">发 布 文 章</router-link></a-button></div>
          <div><a-button size="large" @click="showModal">修 改 信 息</a-button></div>
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

  <a-modal v-model:open="open" title="修改信息" :footer="null">

    <div class="h-8"></div>

    <a-form :model="userData" name="basic" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">

      <a-form-item label="学校" name="school" :rules="[{ required: true, message: '请输入学校！' }]">
        <a-input v-model:value="userData.school" />
      </a-form-item>

      <a-form-item label="专业" name="major" :rules="[{ required: true, message: '请输入专业！' }]">
        <a-input v-model:value="userData.major" />
      </a-form-item>

      <a-form-item label="地区" name="address" :rules="[{ required: true, message: '请输入地区！' }]">
        <a-input v-model:value="userData.address" />
      </a-form-item>

      <a-upload list-type="picture" action="/api/resourse/upload" :headers="{ token }" @change="onFileChange">
        <a-button>
          <template #icon>
            <UploadOutlined />
          </template>
          上传头像
        </a-button>
      </a-upload>

      <div class="h-4"></div>

      <a-form-item :wrapper-col="{ offset: 10, span: 16 }">
        <a-button type="primary" html-type="submit">发布</a-button>
      </a-form-item>

    </a-form>

  </a-modal>

</template>

<style scoped></style>