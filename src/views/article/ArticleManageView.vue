<script setup>
import { ref, onMounted } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import { articleGetCateListService } from '@/api/article'
const articleList = ref([
  {
    title: '人工智能是如何影响我们的日常生活的',
    cate_name: '科学',
    pub_date: new Date().toLocaleDateString(),
    state: '已发布'
  }
])

const cateList = ref([])

onMounted(async () => {
  const {
    data: { data: cate }
  } = await articleGetCateListService()
  cateList.value = cate
  // const {
  //   data: { data: art }
  // } = await articleGetArtListService(1, 10)
  // articleList.value = art
})

const selectedCate = ref()

const selectedState = ref('')

const handleReset = () => {
  selectedCate.value = ''
  selectedState.value = ''
}
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary">发布文章</el-button>
    </template>
    <!-- 搜索区域 -->
    <el-form inline>
      <el-form-item label="文章分类:">
        <el-select v-model="selectedCate" style="width: 200px">
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :value="item.id"
            :label="item.cate_name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布状态:">
        <el-select v-model="selectedState" style="width: 200px">
          <el-option value="已发布" label="已发布"></el-option>
          <el-option value="草稿" label="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table :data="articleList" stripe>
      <el-table-column prop="title" label="文章标题" width="400" />
      <el-table-column prop="cate_name" label="分类" />
      <el-table-column prop="pub_date" label="发表时间" />
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
  </page-container>
</template>
<style scoped lang="scss"></style>
