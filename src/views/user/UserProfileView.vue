<script setup>
import { userUpdateInfoService } from '@/api/user'
import PageContainer from '@/components/PageContainer.vue'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
// 表单引用
const formRef = ref()

// 从仓库获取用户信息
const {
  userInfo: { id, username, nickname, email },
  getUserInfo
} = useUserStore()

// 表单数据
const form = ref({
  id,
  username,
  nickname,
  email
})

// 校验规则
const rules = ref({
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '长度在 2 到 10 个非空字符',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['blur', 'change']
    }
  ]
})

/**
 * 提交表单函数
 * 此函数负责验证表单数据的有效性，并在验证通过后更新用户信息
 * 使用async/await处理异步操作，确保表单验证和用户信息更新按顺序执行
 */
const submitForm = async () => {
  // 调用表单验证方法，await确保异步验证完成后再继续执行
  const valid = await formRef.value.validate()

  // 如果表单验证通过，则执行用户信息更新和获取最新用户信息的操作
  if (valid) {
    // 更新用户信息，await确保更新操作完成后才继续执行
    await userUpdateInfoService(form.value)

    // 获取更新后的用户信息，await确保获取操作完成后才继续执行
    await getUserInfo()

    // 显示成功修改的提示信息
    ElMessage.success('修改成功')
  }
}
</script>
<template>
  <page-container title="基本资料">
    <template #default>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="登录名称" prop="username">
          <el-input v-model="form.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交修改</el-button>
        </el-form-item>
      </el-form>
    </template>
  </page-container>
</template>
<style scoped lang="scss"></style>
