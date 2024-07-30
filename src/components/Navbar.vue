<script setup>
import { ref, reactive } from 'vue'
import { useTokenStore } from '../stores/user.js'
import { getCaptcha, userSignIn, userSignUp } from '../apis/api'

const { setToken } = useTokenStore()
const data = ref({})
const openSignInModal = ref(false)
const openSignUpModal = ref(false)
const formState = reactive({
  username: '',
  password: '',
  authcode: '',
})

const showSignInModal = () => {
  openSignInModal.value = true
  getCaptcha().then(res => {
    data.value = res.data.data
  })
}

const showSignUpModal = () => {
  openSignUpModal.value = true
  getCaptcha().then(res => {
    data.value = res.data.data
  })
}

const onSignInFinish = values => {
  console.log('Success:', values)
  userSignIn(formState.username, formState.password, data.value.userKey, formState.authcode).then(
    res => {
      console.log(res.data.data.token)
      setToken(res.data.data.token)
    }
  )
  openSignInModal.value = false
}

const onSignUpFinish = values => {
  console.log('Success:', values)
  userSignUp(formState.username, formState.password, data.value.userKey, formState.authcode).then(res => { console.log(res) })
  openSignUpModal.value = false
}

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo)
}
</script>

<template>
  <div class="shadow h-20 mb-4 flex text-xl bg-white">

    <div class="ml-10 m-auto flex">
      <div class="mr-6"><router-link to="/">首页</router-link></div>
      <div class="mr-6"><router-link to="/activity">活动</router-link></div>
      <div class="mr-6"><router-link to="/job">内推</router-link></div>
    </div>

    <a-input-search
      class="m-auto"
      placeholder="请输入搜索词"
      style="width: 400px"
      size="large"
    />

    <div class="mr-10 m-auto flex">
      <div class="ml-6 hover:cursor-pointer" @click="showSignUpModal">注册</div>
      <div class="ml-6 hover:cursor-pointer" @click="showSignInModal">登录</div>
    </div>

  </div>

  <a-modal v-model:open="openSignInModal" title="登录" :footer="null">

    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onSignInFinish"
      @finishFailed="onFinishFailed"
    >

      <div class="w-100">
        <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名！' }]">
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item label="密 码" name="password" :rules="[{ required: true, message: '请输入密码！' }]">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item label="验证码" name="authcode" :rules="[{ required: true, message: '请输入验证码！' }]">
          <a-input v-model:value="formState.authcode" />
        </a-form-item>
      </div>

      <div class="mb-8 flex justify-center">
        <img class="hover:cursor-pointer" :src="data.captcherImg" alt="captcha"
          @click="getCaptcha().then(res => { data = res.data.data })">
      </div>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>

    </a-form>

  </a-modal>

  <a-modal v-model:open="openSignUpModal" title="注册" :footer="null">

    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onSignUpFinish"
      @finishFailed="onFinishFailed"
    >

      <div class="w-100">
        <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名！' }]">
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item label="密 码" name="password" :rules="[{ required: true, message: '请输入密码！' }]">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item label="验证码" name="authcode" :rules="[{ required: true, message: '请输入验证码！' }]">
          <a-input v-model:value="formState.authcode" />
        </a-form-item>
      </div>


      <div class="mb-8 flex justify-center">
        <img class="hover:cursor-pointer" :src="data.captcherImg" alt="captcha"
          @click="getCaptcha().then(res => { data = res.data.data })">
      </div>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">注册</a-button>
      </a-form-item>

    </a-form>

  </a-modal>

</template>

<style scoped>
.shadow {
  box-shadow: 0 1px 4px 1px grey;
}
</style>