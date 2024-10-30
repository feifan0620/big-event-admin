import { useUserStore } from '@/stores'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // 基础地址，超时时间
  baseURL,
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 携带token
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 数据获取成功，直接返回数据
    if (res.data.code === 0) {
      return res
    }
    // 处理业务失败
    ElMessage.err(res.data.message || '服务异常')
    return Promise.reject(res.data)
  },
  (err) => {
    ElMessage.err(err.response.data.message || '服务异常')
    // 处理401错误(无权限或登录超时则前往登录界面)
    if (err.response.status === 401) {
      router.push('/login')
    }
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
