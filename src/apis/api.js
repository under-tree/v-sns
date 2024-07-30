import axios from '../utils/axios'


export async function getCaptcha() {
  return axios.get('/auth/captcha')
}

export async function userSignIn(username, password, authkey, authcode) {
  return axios({
    url: `/auth/login?userKey=${authkey}&code=${authcode}`,
    method: 'post',
    data: { username, password },
  })
}

export async function userSignUp(username, password, authkey, authcode) {
  return axios({
    url: `/auth/register?userKey=${authkey}&code=${authcode}`,
    method: 'post',
    data: { username, password },
  })
}

export async function getPosts() {
  return axios.get('/posts')
}

export async function getPost(postId) {
  return axios.get('/posts/' + postId)
}

export async function getNotices() {
  return axios.get('/notices')
}

export async function postPost(title, content) {
  return axios({
    url: '/posts/insert',
    method: 'post',
    data: { title, content }
  })
}

export async function getProfile() {
  return axios.get('/user/info')
}
