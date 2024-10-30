<script setup>
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()
</script>

<template>
  <div>大事件管理系统</div>
  <div class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <p>{{ userStore.token }}</p>
    <el-button
      type="primary"
      @click="userStore.setToken('fbciqbciuqbeivcbiqebvieu')"
      >登录</el-button
    >
    <el-button type="danger" @click="userStore.removeToken()">退出</el-button>
  </div>
</template>

<style scoped></style>
