<script setup>
import Fheader from "~/layout/component/Fheader.vue";
import FMenu from "~/layout/component/FMenu.vue";
import FTaglist from "~/layout/component/FTaglist.vue";
import {useUserStore} from "~/store/index.js";

const userStore = useUserStore()

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Fheader></Fheader>
      </el-header>
      <el-container>
        <el-aside :width="userStore.asideWidth">
          <FMenu></FMenu>
        </el-aside>
        <el-main>
          <FTaglist></FTaglist>
          <router-view v-slot="{Component}">
            <transition name="fade">
              <keep-alive :max="10">
                <component :is="Component"></component>
              </keep-alive>
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style scoped>
.el-aside{
  transition: all 0.2s;
}
.fade-enter-from{
  opacity: 0;
}
.fade-enter-to{
  opacity: 1;
}
.fade-leave-from{
  opacity: 1;
}
.fade-leave-to{
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active{
  transition: all 0.3s;
}
.fade-enter-active{
  transition-delay: 0.3s;
}
</style>