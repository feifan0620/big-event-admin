import request from '@/utils/request'

/**
 * @description 用户注册
 * @param {*} { usernmae, password, repassword }
 * @returns Promise
 */
export const userRegisterService = ({ username, password, repassword }) => {
  return request.post('/api/reg', { username, password, repassword })
}
