import request from '@/utils/request'

/**
 * @description 用户注册
 * @param {*} { usernmae, password, repassword }
 * @returns Promise
 */
export const userRegisterService = ({ username, password, repassword }) => {
  return request.post('/api/reg', { username, password, repassword })
}

/**
 * @description 用户登录
 * @param {*} { username, password }
 * @returns Promise
 */
export const userLoginService = ({ username, password }) => {
  return request.post('/api/login', { username, password })
}
