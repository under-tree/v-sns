import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import PostDetail from './pages/PostDetail.vue'
import Activity from './pages/Activity.vue'
import ActivityDetail from './pages/PostDetail.vue'
import Job from './pages/Job.vue'
import JobDetail from './pages/PostDetail.vue'
import Resource from './pages/Resource.vue'
import ResourceDetail from './pages/PostDetail.vue'
import NoticeDetail from './pages/PostDetail.vue'
import Panel from './pages/Panel.vue'
import User from './pages/User.vue'
import Editor from './pages/Editor.vue'

const routes = [
  { 'path': '/', 'component': Home },
  { 'path': '/posts/:id', 'component': PostDetail },
  { 'path': '/activity', 'component': Activity },
  { 'path': '/activity/:id', 'component': ActivityDetail },
  { 'path': '/job', 'component': Job },
  { 'path': '/job/:id', 'component': JobDetail },
  { 'path': '/resource', 'component': Resource },
  { 'path': '/resource/:id', 'component': ResourceDetail },
  { 'path': '/notice/:id', 'component': NoticeDetail },
  { 'path': '/user', 'component': Panel },
  { 'path': '/users/:id', 'component': User },
  { 'path': '/editor', 'component': Editor },
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
