<script setup>
import { articleDelCateService, articleGetCateListService } from '@/api/article'
import { ref, onMounted } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import CateEdit from './components/CateEdit.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
// 分类列表数据
const cateList = ref([])
// 数据加载 loading 状态
const loading = ref(false)

// 分类数据添加/更新成功后刷新列表数据
const onSuccess = () => {
  getCateList()
}

/**
 * 获取分类列表数据
 */
const getCateList = async () => {
  // 获取数据前显示加载动画
  loading.value = true
  // 从服务器获取文章分类列表数据
  const res = await articleGetCateListService()
  // 将获取到的数据赋值给 cateList
  cateList.value = res.data.data
  // 数据获取成功后关闭加载动画
  loading.value = false
}

// 在组件挂载后获取分类列表数据
onMounted(() => {
  getCateList()
})

/**
 * @description 编辑文章分类
 * @param row 需要回显的数据
 */
const handleEdit = (row) => {
  // 打开对话框以执行编辑操作
  dialog.value.openDialog(row)
}

/**
 * 添加文章分类
 */
const onAddCate = () => {
  // 打开对话框以执行添加操作
  dialog.value.openDialog()
}

/**
 * @description 表单数据删除事件
 * @param row 当前行的数据
 */
const handleDelete = async (row) => {
  // 删除数据前对用户进行提示
  await ElMessageBox.confirm('确定要删除此分类吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  // 用户点击确定后删除服务器中的数据
  await articleDelCateService(row.id)
  // 删除成功后对用户进行提示并更新列表数据
  ElMessage.success('删除成功')
  getCateList()
}

// 对话框引用
const dialog = ref()
</script>
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddCate"> 添加分类 </el-button>
    </template>
    <el-table v-loading="loading" :data="cateList" stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="cate_name" label="名称" />
      <el-table-column prop="cate_alias" label="别名" />
      <el-table-column label="操作" width="100">
        <template #default="{ row, $index }">
          <el-button
            type="success"
            @click="handleEdit(row, $index)"
            :icon="Edit"
            plain
            circle
          ></el-button>
          <el-button
            type="danger"
            @click="handleDelete(row, $index)"
            :icon="Delete"
            plain
            circle
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="无分类数据" />
      </template>
    </el-table>
    <CateEdit ref="dialog" @success="onSuccess"></CateEdit>
  </page-container>
</template>
<style scoped lang="scss"></style>
