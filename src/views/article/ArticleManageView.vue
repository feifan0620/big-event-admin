<script setup></script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary">发布文章</el-button>
    </template>
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
  </page-container>
</template>
<style scoped lang="scss"></style>
