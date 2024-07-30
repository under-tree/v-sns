import axios from 'axios'
import { useTokenStore } from '../stores/user.js'

const whiteList = [
  '/auth/captcha',
  '/auth/login',
  '/auth/register',
  '/posts',
]

const instance = axios.create({
  baseURL: '/api',
}, error => {
  console.log(error)
  Promise.reject(error)
})

instance.interceptors.request.use(config => {
  const { token } = useTokenStore()
  if (whiteList.indexOf(config.url.split('?')[0]) == -1) {
    config.headers.token = token
  }
  return config
})


export default instance
