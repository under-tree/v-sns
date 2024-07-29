import axios from '../utils/axios'


export async function getCaptcha() {
  return axios.get('/auth/captcha')
}

export async function userSignIn(username, password, authkey, authcode) {
  return axios({
    url: `/auth/login?userKey=${authkey}&code=${authcode}`,
    method: 'post',
    headers: { username, password }
  })
}

export async function getPosts() {
  return axios.get('/posts')
}

export async function getPost(postId) {
  return axios.get(`/posts/${postId}?_embed=comments`)
}
