<script setup>
import {useRoute, useRouter} from "vue-router";
import {useUserStore} from "~/store/index.js";
import {computed,ref} from "vue";

const router = useRouter()
const route = useRoute()
// 默认选中
const defaultActive = ref(route.path)

const userStore = useUserStore()
const handleSelect = (e)=>{
  router.push(e)
}

const asideMenus = computed(()=> userStore.menus)

const isCollapse = computed(()=>!(userStore.asideWidth === '250px'))

</script>

<template>
  <div class="f-menu" :style="{width:userStore.asideWidth}">
    <el-menu :collapse="isCollapse" default-active="2" class="border-0"
             @select="handleSelect" :collapse-transition="false" :unique-opened="true"
              :default-active="defaultActive"
    >
      <template v-for="(item,index) in asideMenus" :key="index">
        <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item v-for="(item2,index2) in item.child" :key="index2"
                        :index="item2.frontpath">
            <el-icon>
              <component :is="item2.icon"></component>
            </el-icon>
            <span>{{ item2.name }}</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item v-else :index="item.frontpath">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style scoped>
.f-menu {
  transition:all 0.2s;
  top: 64px;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  @apply shadow-md fixed bg-light-50
}
.f-menu::-webkit-scrollbar{
  width: 0;
}
</style>