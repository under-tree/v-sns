import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

const storage = useStorage('vsns-token', '')

export const useTokenStore = defineStore('token', () => {
  const token = ref(storage.value || '')
  const isLogin = computed(() => !!token.value)

  const setToken = (value) => {
    token.value = value
    storage.value = value
  }

  return {
    token,
    isLogin,
    setToken
  }
})
