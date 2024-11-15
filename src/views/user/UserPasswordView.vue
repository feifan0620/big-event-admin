<script setup>
import { ref } from 'vue'
import PageContainer from '@/components/PageContainer.vue'
import { userUpdatePasswordService } from '@/api/user'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()
const pwdFormRef = ref()
// 表单数据
const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

// 表单验证规则
const rules = {
  old_pwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码长度应为6到15位非空字符',
      trigger: 'blur'
    }
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码长度应为6到15位非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value === pwdForm.value.old_pwd) {
          callback(new Error('新密码不能与原密码相同'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  re_pwd: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码长度应为6到15位非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value !== pwdForm.value.new_pwd) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

/**
 * 异步提交表单函数
 * 此函数旨在验证表单信息，并在验证通过后更新用户密码并执行相关操作
 */
const submitForm = async () => {
  // 调用表单验证方法，确保输入信息符合规范
  const valid = await pwdFormRef.value.validate()

  // 若表单验证成功，则执行密码更新及其他相关操作
  if (valid) {
    // 调用服务更新用户密码
    await userUpdatePasswordService(pwdForm.value)

    // 显示密码修改成功的消息提示
    ElMessage.success('密码修改成功')

    // 清除用户令牌，表示用户已登出
    userStore.setToken('')

    // 清除用户信息，确保数据一致性
    userStore.setUserInfo({})

    // 重定向用户到登录页面
    router.push('/login')
  }
}

const resetForm = () => {
  pwdForm.value = {
    old_pwd: '',
    new_pwd: '',
    re_pwd: ''
  }
}
</script>
<template>
  <page-container title="重置密码">
    <template #default>
      <el-form
        :model="pwdForm"
        :rules="rules"
        ref="pwdFormRef"
        label-width="100px"
        style="max-width: 500px"
      >
        <el-form-item label="原密码" prop="old_pwd">
          <el-input
            v-model="pwdForm.old_pwd"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_pwd">
          <el-input
            v-model="pwdForm.new_pwd"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="re_pwd">
          <el-input
            v-model="pwdForm.re_pwd"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">修改密码</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
  </page-container>
</template>
<style scoped lang="scss"></style>
