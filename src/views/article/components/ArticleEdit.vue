<script setup>
import { ref } from 'vue'
import CateSelect from './CateSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {
  articleDetailService,
  articlePublicService,
  articleUpdateService
} from '@/api/article'
import { ElMessage } from 'element-plus'
import { baseURL } from '@/utils/request'
import axios from 'axios'

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

const editorRef = ref()

const open = async (row) => {
  // 显示抽屉弹出层
  visibleDrawer.value = true
  if (row.id) {
    const res = await articleDetailService(row.id)
    formModel.value = res.data.data
    imgUrl.value = baseURL + res.data.data.cover_img
    // 提交给后台，需要的是 file 格式的，将网络图片，转成 file 格式
    // 网络图片转成 file 对象, 需要转换一下
    formModel.value.cover_img = await imageUrlToFile(
      imgUrl.value,
      formModel.value.cover_img
    )
  } else {
    // 重置表单
    formModel.value = { ...defaultForm }
    imgUrl.value = ''
    editorRef.value.setHTML('')
  }
}

const imgUrl = ref()

const handleImgSelect = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.cover_img = uploadFile.raw
}

const emit = defineEmits(['success'])
const handleSubmit = async (state) => {
  formModel.value.state = state
  // 转换 formdata 数据
  const artFd = new FormData()
  for (let key in formModel.value) {
    artFd.append(key, formModel.value[key])
  }

  if (formModel.value.id) {
    await articleUpdateService(artFd)
    ElMessage.success('修改成功')
    visibleDrawer.value = false
    emit('success', 'edit')
  } else {
    await articlePublicService(artFd)
    ElMessage.success('发布成功')
    visibleDrawer.value = false
    emit('success', 'add')
  }
}

// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], {
      type: response.headers['content-type']
    })

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
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
            ref="editorRef"
          ></QuillEditor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit('已发布')"
          >发布</el-button
        >
        <el-button type="info" @click="handleSubmit('草稿')">草稿</el-button>
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
