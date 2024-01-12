<script setup>
import {Shop, Fold, Refresh, FullScreen, ArrowDown, Aim, User, Lock, Expand} from "@element-plus/icons-vue";
import {useUserStore} from "~/store/index.js";
import {logout, updatepassword} from "~/api/manager.js";
import {useRouter} from "vue-router";
import {useFullscreen} from '@vueuse/core'
import FormDrawer from "~/components/FormDrawer.vue";
import {useRepassword, useLogout} from "~/composable/useManager.js";

const userStore = useUserStore()
const router = useRouter()

const {isFullscreen, toggle} = useFullscreen()
const {
  formDrawerRef,
  form,
  formRef,
  rules,
  onSubmit,
  openRePasswordRef
} = useRepassword()

const {
  handleLogout
} = useLogout()


const handleCommand = (command) => {
  switch (command) {
    case 'rePassword':
      openRePasswordRef()
      break
    case 'logout':
      handleLogout()
      break
  }
}


const handleRefresh = () => location.reload()

</script>

<template>
  <div class="f-header">
    <span class="logo">
          <el-icon><Shop/></el-icon>
          后台管理系统
    </span>
    <el-tooltip effect="dark" content="折叠菜单" placement="bottom">
      <el-icon class="icon-btn" @click = 'userStore.handleAsideWidth()'>
        <Fold v-if="userStore.asideWidth === '250px'"/>
        <expand v-else/>
      </el-icon>
    </el-tooltip>
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh">
        <refresh/>
      </el-icon>
    </el-tooltip>
    <div class="ml-auto flex items-center">
      <el-icon class="icon-btn" @click="toggle">
        <FullScreen v-if="!isFullscreen"/>
        <Aim v-else></Aim>
      </el-icon>
      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="flex items-center text-light-50">
          <el-avatar class="mr-2" :size="25" :src="userStore.user.avatar"/>
          {{ userStore.user.username }}
          <el-icon class="el-icon--right">
                        <ArrowDown/>
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <!--            dropdown-item中点击触发的事件信息传递给父组件，从而实现事件监听-->
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>

      </el-dropdown>
    </div>
  </div>
  <form-drawer ref="formDrawerRef" title="修改密码" destroyonclose @submit="onSubmit">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input v-model="form.oldpassword" placeholder="请输入旧密码"/>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input type='password' v-model="form.password" placeholder="请输入新密码"/>
      </el-form-item>
      <el-form-item prop="repassword" label="重复密码">
        <el-input type='password' v-model="form.repassword" placeholder="请确认密码"/>
      </el-form-item>
    </el-form>
  </form-drawer>


</template>

<style scoped>
.f-header {
  @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
  height: 64px;
  z-index: 1000;
}

.logo {
  width: 250px;
  @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
  @apply flex justify-center items-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}

.icon-btn:hover {
  @apply bg-indigo-600;
}

.f-header .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
}
</style>