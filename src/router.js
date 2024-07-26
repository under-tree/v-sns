import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import Editor from './components/Editor.vue'

const routes = [
  { 'path': '/', 'component': Home },
  { 'path': '/about', 'component': About },
  { 'path': '/editor', 'component': Editor },
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
