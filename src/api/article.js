import request from '@/utils/request'

/**
 * @description 获取文章分类列表
 * @returns Promise
 */
export const articleGetCateListService = () => {
  return request.get('/my/cate/list')
}

/**
 * @description 添加文章分类
 * @param {*} cate_name 分类名称
 * @param {*} cate_alias 分类别名
 * @returns Promise
 */
export const articleAddCateService = ({ cate_name, cate_alias }) => {
  return request.post('/my/cate/add', {
    cate_name,
    cate_alias
  })
}

/**
 * @description 更新文章分类
 * @param {*} id 分类 Id
 * @param {*} cate_name 分类名称
 * @param {*} cate_alias 分类别名
 * @returns Promise
 */

export const articleUpdateCateService = ({ id, cate_name, cate_alias }) => {
  return request.put('/my/cate/info', {
    id,
    cate_name,
    cate_alias
  })
}

/**
 * @description 删除文章分类
 * @param {*} id 分类 Id
 * @returns Promise
 */
export const articleDelCateService = (id) => {
  return request.delete('/my/cate/del', {
    params: { id }
  })
}

/**
 * @description 获取文章列表
 * @param {*} obj 文章列表查询参数
 * @returns Promise
 */
export const articleGetArtListService = (pagenum, pagesize, obj) => {
  return request.get('/my/article/list', {
    params: { pagenum, pagesize, ...obj }
  })
}
