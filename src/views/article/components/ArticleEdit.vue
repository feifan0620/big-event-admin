<script setup>
import { ref } from 'vue'
import CateSelect from './CateSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
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
    formModel.value = { ...row }
  } else {
    console.log('发布文章')
    // 重置表单
    formModel.value = { ...defaultForm }
  }
}

const imgUrl = ref()

const handleImgSelect = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.cover_img = uploadFile.raw
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
        <CateSelect v-model="formModel.cate_name" width="100%"></CateSelect>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="img-uploader"
          :show-file-list="false"
          :on-change="handleImgSelect"
          :auto-upload="false"
        >
          <img v-if="imgUrl" :src="imgUrl" class="img" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <QuillEditor
            theme="snow"
            placeholder="请输入文章内容"
            contentType="html"
            v-model:content="formModel.content"
          ></QuillEditor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.img-uploader {
  :deep() {
    .img {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
