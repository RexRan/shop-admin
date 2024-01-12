<script setup>
import AsideList from "~/components/AsideList.vue";
import {
  getImageClass, createImageClass, updateImageClass, deleteImageClass
} from "~/api/ImageClass.js";
import {ref, reactive, computed, onMounted} from 'vue'
import FormDrawer from "~/components/FormDrawer.vue";
import {toast} from "~/composable/util.js";
import {useImageStore} from "~/store/imageList.js";
import {storeToRefs} from "pinia";

// 加载动画
const loading = ref(false)
const list = ref([])
const imageStore = useImageStore()
let {activeId} = storeToRefs(imageStore)


// 分页
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)

// 获取数据
function getData(page = null) {
  if (typeof page === 'number') {
    currentPage.value = page
  }
  loading.value = true
  getImageClass(currentPage.value).then((res) => {
    list.value = res.list
    let item = list.value[0]
    if (item) {
      activeId.value = item.id
    }
  }).finally(res => {
    loading.value = false
  })
}

getData()


function handleActive(id) {
  activeId.value = id
}

const formDrawerRef = ref(null)
// 拿到子组件节点，并获得open方法

const form = reactive({
  name: "",
  order: 50
})
const rules = {
  name: [{
    required: true,
    message: '图库分类名称不能为空',
    trigger: 'blur'
  }]
}

const formRef = ref(null)
const editId = ref(0)

const drawerTitle = computed(() => editId.value !== 0 ? "修改" : "新增")
// 新增
const handleCreate = () => {
  editId.value = 0
  form.name = ""
  form.order = 50
  formDrawerRef.value.open()

}
// 编辑
const handleEdit = (row) => {
  console.log(row)
  editId.value = row.id
  form.name = row.name
  form.order = row.order
  formDrawerRef.value.open()
}
//提交
const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return
    formDrawerRef.value.showLoading()

    const fun =
        editId.value !== 0 ? updateImageClass(editId.value, form) : createImageClass(form)

    fun.then(res => {
      toast(drawerTitle.value + "成功")
      getData(editId.value ? currentPage.value : 1)
      formDrawerRef.value.close()
    }).finally(() => {
      formDrawerRef.value.hideLoading()
    })
  })
}
const handleDelete = (id) => {
  loading.value = true
  deleteImageClass(id).then(() => {
    toast('删除成功')
    getData(1)
  }).finally(() => {
    loading.value = false
  })
}

defineExpose({
  handleCreate
})


</script>

<template>
  <el-aside width="220px" class="image-aside">
    <div class="top">
      <aside-list v-for="(item, index) in list" :key="index"
                  :active="item.id === activeId" @click="handleActive(item.id)"
                  @edit="handleEdit(item)" @delete="handleDelete(item.id)">
        {{ item.name }}
      </aside-list>
    </div>
    <div class="bottom">
      <el-pagination background layout="prev, next" :total="total"
                     :current-page="currentPage" :page-size="limit"
                     @current-change="getData"/>
    </div>
  </el-aside>
  <form-drawer ref="formDrawerRef" @submit="handleSubmit" title="新增">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="order">
        <el-input-number v-model="form.order" :min="0" :max="1000"/>
      </el-form-item>
    </el-form>
  </form-drawer>
</template>

<style scoped>
.image-aside {
  border-right: 1px solid #eeeeee;
  position: relative;
}

.image-aside .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}

.image-aside .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}
</style>