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

/**
 * @description 获取用户信息
 * @returns Promise
 */
export const userGetInfoService = () => {
  return request.get('/my/userinfo')
}

/**
 * @description 更新用户信息
 * @param {*} params
 * @returns Promise
 */
export const userUpdateInfoService = (params) => {
  return request.put('/my/userinfo', params)
}

/**
 * @description 更新用户头像
 * @param {*} avatar
 * @returns Promise
 */
export const userUpdateAvatarService = (avatar) => {
  return request.patch('/my/update/avatar', { avatar })
}

/**
 * @description 更新用户密码
 * @param {*} params
 * @returns Promise
 */
export const userUpdatePasswordService = (params) => {
  return request.patch('/my/updatepwd', params)
}
