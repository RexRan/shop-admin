<script setup>
import {reactive, ref, onMounted, onBeforeMount} from 'vue'
import {User, Lock} from '@element-plus/icons-vue'
import {login} from "~/api/manager.js";
import {useRouter} from 'vue-router'
import {setToken} from '~/composable/auth.js'
import {toast} from "~/composable/util.js";
import {useUserStore} from "~/store/index.js";


const router = useRouter()

// do not use same name with ref
const form = reactive({
  username: '',
  password: '',
})

const formRef = ref(null)
const loading =ref(false)

const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    },
  ],
  password: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    },
  ]
}
const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    } else {
      loading.value = true
      login(form.username, form.password)
          .then((res) => {
            //   提示成功
            toast('登陆成功')
            //   存储token
            setToken(res.token)
            // res已经过响应拦截器处理
            console.log(res)
            // // 获取用户相关信息
            // getInfo().then((res)=>{
            //   user.SET_USERINFO(res)
            //   console.log(res)
            // })

            //   跳转后台首页
            router.push('/')
          })
          .finally(() => {
            loading.value = false
          })
    }
  })
}

// 添加键盘监听事件，enter登录
function onKeyUp(e) {
  if (e.key === 'Enter') onSubmit()
}
// 在这里添加事件监听器，确保事件监听器在组件挂载后开始工作。
onMounted(()=>{
  document.addEventListener('keyup', onKeyUp)
})
// 在这里移除事件监听器，确保在组件卸载前取消事件监听，防止出现内存泄漏和无效的事件处理器。
onBeforeMount(()=>{
  document.removeEventListener('keyup', onKeyUp)
})

</script>
<template>
  <!--  min-h-screen是设置元素的最小高度为屏幕的高度。
  在大多数情况下，这是为了确保元素至少填充整个屏幕高度，即使内容不足以撑满整个屏幕。-->
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div class='font-bold text-5xl text-light-50 mb-4'>欢迎光临</div>
        <div class="text-gray-200 text-sm">xxxxxxxxxxxx</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class=" bg-light-50 right
    flex-col">
      <h2 class="bold text-3xl text-gray-800">欢迎回来</h2>
      <div class="flex items-center justify-center my-5 text-gray-300
      space-x-2">
        <span class="h-[1px] w-16 bg-gray-200"></span>
        <span>账号密码登录</span>
        <span class="h-[1px] w-16 bg-gray-200"></span>
      </div>
      <!--      为什么需要两个ref="formRef" :model="form"-->
      <!--      通过给组件增加ref属性，从而在script中获取组件或元素的实例的引用-->
      <el-form ref="formRef" :model="form" :rules="rules" class="w-[250px]">
        <el-form-item prop="Username">
          <el-input v-model="form.username" placeholder="请输入账号" :prefix-icon="User"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type='password' v-model="form.password" placeholder="请输入密码"
                    :prefix-icon="Lock" show-password/>
        </el-form-item>
        <el-form-item>
          <el-button class="w-[250px]" type="primary" @click="onSubmit"
                     round color="" :loading="loading">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped>
.login-container {
  @apply min-h-screen bg-indigo-500
}

.login-container .left, .login-container .right {
  @apply flex items-center justify-center
}

.login-container .right {
  @apply
}
</style>
