import { ref } from 'vue'
import { defineStore } from 'pinia'
import { userGetInfoService } from '@/api/user'

export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')

    const setToken = (newToken) => {
      token.value = newToken
    }

    const removeToken = () => {
      token.value = ''
    }

    const userInfo = ref()

    const getUserInfo = async () => {
      const res = await userGetInfoService()
      userInfo.value = res.data.data
    }

    const setUserInfo = (newUserInfo) => {
      userInfo.value = newUserInfo
    }

    return {
      token,
      userInfo,
      setToken,
      removeToken,
      getUserInfo,
      setUserInfo
    }
  },
  {
    persist: true
  }
)
