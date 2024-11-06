<script setup>
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
const articleList = ref([
  {
    Id: 5961,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:53:52.604',
    state: '已发布',
    cate_name: '体育'
  },
  {
    Id: 5962,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:54:30.904',
    state: '草稿',
    cate_name: '体育'
  }
])
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary">发布文章</el-button>
    </template>
    <!-- 搜索区域 -->
    <el-form inline>
      <el-form-item label="文章分类:">
        <el-select style="width: 200px" placeholder="请选择">
          <el-option value="101" label="科学"></el-option>
          <el-option value="102" label="体育"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布状态:">
        <el-select style="width: 200px" placeholder="请选择">
          <el-option value="201" label="已发布"></el-option>
          <el-option value="202" label="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
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
    </el-table>
  </page-container>
</template>
<style scoped lang="scss"></style>
