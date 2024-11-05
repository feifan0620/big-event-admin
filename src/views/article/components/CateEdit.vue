<script setup>
import { ref } from 'vue'
const dialogVisible = ref(false)

const formModel = ref({
  cate_name: '',
  cate_alias: ''
})

const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '名称必须为1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,20}$/,
      message: '别名必须为1-20位的字母或数字',
      trigger: 'blur'
    }
  ]
}
const openDialog = async (row) => {
  dialogVisible.value = true
  console.log(row)
}

defineExpose({ openDialog })
</script>
<template>
  <el-dialog v-model="dialogVisible" title="添加分类" width="30%">
    <el-form :model="formModel" :rules="rules">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input
          v-model="formModel.cate_name"
          placeholder="请输入分类名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input
          v-model="formModel.cate_alias"
          placeholder="请输入分类别名"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style scoped lang="scss"></style>
