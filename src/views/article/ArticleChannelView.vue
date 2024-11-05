<script setup>
import { articleGetCateListService } from '@/api/article'
import { ref, onMounted } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import CateEdit from './components/CateEdit.vue'
const cateList = ref([])
const loading = ref(false)
const getCateList = async () => {
  loading.value = true
  const res = await articleGetCateListService()
  cateList.value = res.data.data
  loading.value = false
}
onMounted(() => {
  getCateList()
})

const handleEdit = (row) => {
  dialog.value.openDialog(row)
}
const handleDelete = (row, index) => {
  console.log(row, index)
}

const dialog = ref()
const onAddCate = () => {
  dialog.value.openDialog()
}
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
    <CateEdit ref="dialog"></CateEdit>
  </page-container>
</template>
<style scoped lang="scss"></style>
