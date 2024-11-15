<script setup>
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { userUpdateAvatarService } from '@/api/user'
import { ElMessage } from 'element-plus'
const uploadRef = ref()
const userStore = useUserStore()
const imgUrl = ref(userStore.userInfo.user_pic)
/**
 * 文件上传函数
 * 该函数用于处理文件（目前仅限于图片）上传时的预览功能
 * @param {File} file - 要上传的文件对象，通常来自文件输入元素
 */
const onUploadFile = (file) => {
  // 基于 FileReader 做图片预览
  const reader = new FileReader()
  // 读取文件作为数据URL，以便在浏览器中直接显示图片
  reader.readAsDataURL(file.raw)
  // 当文件读取成功后，执行以下回调函数
  reader.onload = () => {
    // 将读取到的文件数据赋值给 imgUrl，以实现图片预览
    imgUrl.value = reader.result
  }
}

const onUpdateAvatar = async () => {
  await userUpdateAvatarService(imgUrl.value)
  userStore.getUserInfo()
  ElMessage.success('头像更换成功')
}
</script>
<template>
  <page-container title="更换头像">
    <el-row>
      <el-col :span="12">
        <el-upload
          ref="uploadRef"
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <img v-else src="@/assets/avatar.jpg" width="278" />
        </el-upload>
        <br />
        <el-button
          @click="uploadRef.$el.querySelector('input').click()"
          type="primary"
          :icon="Plus"
          size="large"
        >
          选择图片
        </el-button>
        <el-button
          @click="onUpdateAvatar"
          type="success"
          :icon="Upload"
          size="large"
        >
          上传头像
        </el-button>
      </el-col>
    </el-row>
  </page-container>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
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
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>
