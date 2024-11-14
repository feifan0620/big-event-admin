<script setup>
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import CateSelect from './components/CateSelect.vue'
import { articleDeleteService, articleGetArtListService } from '@/api/article'
import { formatTime } from '@/utils/format'
import ArticleEdit from './components/ArticleEdit.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const loading = ref(false) // 加载状态

const total = ref(0) // 文章总数

const articleList = ref([]) // 文章列表

// 文章列表请求参数
const params = ref({
  pagenum: 1,
  pagesize: 10,
  cate_id: '',
  state: ''
})

/**
 * 获取文章列表数据
 */
const getArticleList = async () => {
  loading.value = true
  const res = await articleGetArtListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}

// 页面创建时加载文章列表数据
getArticleList()

/**
 * @description 修改每页数据长度时触发
 * @param size 每页数据长度
 */
const handleSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}

/**
 * @description 修改当前页码是触发
 * @param page 当前页码
 */
const handleCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}

// 文章搜索
const handleSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}

// 清空搜索条件
const handleReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}

const articleEditRef = ref()
const addArticle = () => {
  articleEditRef.value.open({})
}

const handleEdit = (row) => {
  articleEditRef.value.open(row)
}

const handleDelete = async (row) => {
  await ElMessageBox.confirm('确定要删除该文章吗', '提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
  await articleDeleteService(row.id)
  ElMessage.success('删除成功')
  getArticleList()
}

const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加文章，则跳转渲染最后一页
    params.value.pagenum = Math.ceil((total.value + 1) / params.value.pagesize)
    getArticleList()
  }
  // 如果是编辑则直接渲染
  getArticleList()
}
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="addArticle()">发布文章</el-button>
    </template>
    <!-- 搜索区域 -->
    <el-form inline>
      <el-form-item label="文章分类:">
        <CateSelect width="200px" v-model:cateId="params.cate_id"></CateSelect>
      </el-form-item>
      <el-form-item label="发布状态:">
        <el-select v-model="params.state" style="width: 200px">
          <el-option value="已发布" label="已发布"></el-option>
          <el-option value="草稿" label="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSearch" type="primary">搜索</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table :data="articleList" v-loading="loading" stripe>
      <el-table-column prop="title" label="文章标题" width="400" />
      <el-table-column prop="cate_name" label="分类" />
      <el-table-column prop="pub_date" label="发表时间">
        <template #default="{ row }"> {{ formatTime(row.pub_date) }}</template>
      </el-table-column>
      <el-table-column prop="state" label="状态" />
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            type="primary"
            @click="handleEdit(row)"
            :icon="Edit"
            plain
            circle
          ></el-button>
          <el-button
            type="danger"
            @click="handleDelete(row)"
            :icon="Delete"
            plain
            circle
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="无文章数据" />
      </template>
    </el-table>
    <!-- 分页导航 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 4, 5, 10]"
      background
      layout="jumper,total, sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
    <!-- 弹出层抽屉 -->
    <ArticleEdit ref="articleEditRef" @success="onSuccess"></ArticleEdit>
  </page-container>
</template>
<style scoped lang="scss"></style>
