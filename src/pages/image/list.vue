<template>
    <div>
      <el-container class="bg-white is-rounded" :style="{height:(h + 'px')}">
        <el-header class="image-header">
          <el-button type="primary" size="small" @click="handleOpenCreate">新增图片</el-button>
        </el-header>
        <el-container>
          <image-aside ref="ImageAsideRef"></image-aside>
          <image-main></image-main>
        </el-container>
      </el-container>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import ImageAside from "~/components/ImageAside.vue";
import ImageMain from "~/components/ImageMain.vue";

const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight - 64 - 44- 20

const ImageAsideRef = ref(null)
const handleOpenCreate = () => ImageAsideRef.value.handleCreate()
</script>

<style>
.image-header{
  border-bottom: 1px solid #eeeeee;
  @apply flex items-center;
}

</style>