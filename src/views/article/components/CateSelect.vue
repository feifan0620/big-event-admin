<script setup>
import { articleGetCateListService } from '@/api/article'
import { ref } from 'vue'

defineProps({
  cateId: {
    type: [Number, String]
  }
})

const emit = defineEmits(['update:cateId'])

const cateList = ref([])
const getCateList = async () => {
  const res = await articleGetCateListService()
  cateList.value = res.data.data
}

getCateList()
</script>
<template>
  <el-select
    :modelValue="cateId"
    @update:modelValue="emit('update:cateId', $event)"
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
