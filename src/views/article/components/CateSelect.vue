<script setup>
import { articleGetCateListService } from '@/api/article'
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: [Number, String]
  }
})

const emit = defineEmits(['update:modelValue'])

const cateList = ref([])
const getCateList = async () => {
  const res = await articleGetCateListService()
  cateList.value = res.data.data
}

getCateList()
</script>
<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    style="width: 200px"
  >
    <el-option
      v-for="item in cateList"
      :key="item.id"
      :value="item.id"
      :label="item.cate_name"
    ></el-option>
  </el-select>
</template>
