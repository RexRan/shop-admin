<script setup>
import {ref, watch} from 'vue'
import {getImageList} from "~/api/Image.js";
import {useImageStore} from "~/store/imageList.js";
import {storeToRefs} from "pinia";

// 分页
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)
const list = ref([])
const loading = ref(false)

const imageStore = useImageStore()
let {activeId} = storeToRefs(imageStore)

// 获取数据
function getData(p = null){
  if(typeof p == "number"){
    currentPage.value = p
  }

  loading.value = true
  getImageList(activeId.value,currentPage.value)
      .then(res=>{
        total.value = res.totalCount
        list.value = res.list
      })
      .finally(()=>{
        loading.value = false
      })
}

// 根据分类ID重新加载图片列表
watch(()=> activeId.value,()=>{
  currentPage.value = 1
  console.log('watch',activeId.value)
  getData()
})

</script>

<template>
  <el-main class="image-main" v-loading="loading">
    <div class="top">
      <div v-for="(item,index) in list" :key="index">{{ item.url }}</div>
    </div>
    <div class="bottom">
      <el-pagination
          background
          layout="prev,pager, next"
          :total="total"
          :current-page="currentPage"
          :page-size="limit"
          />
    </div>
  </el-main>
</template>

<style scoped>
.image-main{
  position: relative;
}
.image-main .top{
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}
.image-main .bottom{
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}
</style>