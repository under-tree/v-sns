import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Activity from './pages/Activity.vue'
import Job from './pages/Job.vue'
import User from './pages/User.vue'
import PostDetail from './pages/PostDetail.vue'
import Editor from './pages/Editor.vue'

const routes = [
  { 'path': '/', 'component': Home },
  { 'path': '/activity', 'component': Activity },
  { 'path': '/job', 'component': Job },
  { 'path': '/user', 'component': User },
  { 'path': '/users/:id', 'component': User },
  { 'path': '/posts/:id', 'component': PostDetail },
  { 'path': '/editor', 'component': Editor },
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
