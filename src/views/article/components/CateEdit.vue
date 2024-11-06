<script setup>
import { articleAddCateService, articleUpdateCateService } from '@/api/article'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

// 定义 emit 函数
const emit = defineEmits(['success'])

// 对话框显示/隐藏
const dialogVisible = ref(false)

// 文章分类表单数据
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})

// 文章分类表单校验规则
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

/**
 * 分类表单添加/更新提交事件
 */
const onDialogSubmit = async () => {
  // 提交前对表单进行校验
  await formRef.value.validate()
  // 若分类 id 存在，则为添加分类，否则为更新分类
  formModel.value.id
    ? await articleUpdateCateService(formModel.value)
    : await articleAddCateService(formModel.value)
  // 服务器数据更新成功后对用户进行提示
  ElMessage.success(formModel.value.id ? '更新成功' : '添加成功')
  // 关闭对话框
  dialogVisible.value = false
  // 触发自定义事件 “success”，以便父组件能监听到数据发生改变，并对数据进行刷新
  emit('success')
}

/**
 * @description 打开添加/编辑分类对话框，并对数据进行回显（编辑分类的情况下）
 * @param row 当前行的数据（若为添加分类，则为空数据）
 */
const openDialog = async (row) => {
  dialogVisible.value = true
  formModel.value = { ...row }
}

// 表单引用
const formRef = ref()

// 将 openDialog 函数暴露给外部使用
defineExpose({ openDialog })
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="30%"
  >
    <el-form ref="formRef" :model="formModel" :rules="rules">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input
          v-model="formModel.cate_name"
          placeholder="请输入分类名称"
          minlength="1"
          maxlength="10"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input
          v-model="formModel.cate_alias"
          placeholder="请输入分类别名"
          minlength="1"
          maxlength="20"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onDialogSubmit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style scoped lang="scss"></style>
