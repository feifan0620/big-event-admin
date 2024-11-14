<script setup>
import { ref } from 'vue'
import CateSelect from './CateSelect.vue'
const visibleDrawer = ref(false) // 是否显示抽屉

const defaultForm = {
  title: '', // 文章标题
  cate_id: '', // 文章分类 ID
  content: '', // 文章内容
  cover_img: '', // 文章封面
  state: '' // 文章状态：已发布/草稿
}

// 表单参数
const formModel = ref({
  ...defaultForm
})

const open = (row) => {
  // 显示抽屉弹出层
  visibleDrawer.value = true
  if (row.id) {
    console.log('编辑回显')
  } else {
    console.log('发布文章')
    // 重置表单
    formModel.value = { ...defaultForm }
  }
}

defineExpose({
  open
})
</script>
<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <CateSelect v-model="formModel.cate_id" width="100%"></CateSelect>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img"> 文件上传 </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">富文本编辑器</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
