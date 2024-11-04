import request from '@/utils/request'

/**
 * @description 获取文章分类列表
 * @returns Promise
 */
export const articleGetCateListService = () => {
  return request.get('/my/cate/list')
}
