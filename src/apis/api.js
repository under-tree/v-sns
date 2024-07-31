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

export async function getProfile(userId) {
  if (userId) {
    return axios.get('/user/info?userId=' + userId)
  } else {
    return axios.get('/user/info')
  }
}

export async function postProfile(data) {
  return axios({
    url: '/user/info',
    method: 'put',
    data: data,
  })
}

export async function getPosts(page) {
  return axios.get(`/posts?page=${page}&pageSize=7`)
}

export async function getPostsById(userId) {
  return axios.get(`/posts?userId=${userId}`)
}

export async function getPost(postId) {
  return axios.get('/posts/' + postId)
}

export async function postPost(title, content, coverPicture) {
  return axios({
    url: '/posts',
    method: 'post',
    data: { title, content, coverPicture }
  })
}

export async function getJobs() {
  return axios.get('/jobs')
}

export async function getJobsById(userId) {
  return axios.get('/user/jobs')
}

export async function getJob(jobId) {
  return axios.get('/jobs/' + jobId)
}

export async function postJob(title, content) {
  return axios({
    url: '/jobs',
    method: 'post',
    data: { title, content }
  })
}

export async function getResources() {
  return axios.get('/resourse')
}

export async function getResourcesById() {
  return axios.get('/user/resources')
}

export async function getResource(resourceId) {
  return axios.get('/resourse/' + resourceId)
}

export async function postResource(title, content) {
  return axios({
    url: '/resourse',
    method: 'post',
    data: { title, content }
  })
}

export async function getNotices() {
  return axios.get('/notices')
}

export async function getNotice(noticeId) {
  return axios.get('/notices/' + noticeId)
}

export async function getActivities() {
  return axios.get('/activities')
}

export async function getActivity(activityId) {
  return axios.get('/activities/' + activityId)
}

export async function uploadFile(data) {
  return axios({
    url: '/resourse/upload',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export async function newUpvote(postId) {
  return axios.put('/posts/' + postId)
}

export async function newComment(content, postId, replyTo) {
  return axios({
    url: '/posts/comment',
    method: 'post',
    data: {
      postId: postId,
      pid: 0,
      toUid: replyTo,
      content: content,
    }
  })
}
