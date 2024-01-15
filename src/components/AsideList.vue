<script setup>
import {Close, Edit} from "@element-plus/icons-vue";

defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
defineEmits(['edit', 'delete'])

</script>

<template>
    <div class="aside-list" :class="{'active': active}">
      <span class="truncate">
        <slot/>
      </span>
      <el-button text class="ml-auto px-1" type="primary" size="default"
                 @click.stop="$emit('edit')">
        <el-icon :size="14">
          <Edit/>
        </el-icon>
      </el-button>
      <el-popconfirm title="确定要删除吗?" confirm-button-text="确认" cancel-button-text="取消">
        <template #reference>
          <el-button text class="px-1" type="primary" size="default"
                     @click.stop="$emit('delete')">
            <el-icon :size="14">
              <Close/>
            </el-icon>
          </el-button>
        </template>
      </el-popconfirm>

    </div>

</template>

<style scoped>
.aside-list{
  border-bottom: 1px solid #f4f4f4;
  cursor: pointer;
  @apply flex items-center p-3 text-sm text-gray-600;
}
.aside-list:hover,.active{
  @apply bg-blue-50;
}
</style>