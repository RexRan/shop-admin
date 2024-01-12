import {reactive, ref} from "vue";
import {logout, updatepassword} from "~/api/manager.js";
import {showModal, toast} from "~/composable/util.js";
import {useUserStore} from "~/store/index.js";
import {useRouter} from "vue-router";
import {removeToken} from "~/composable/auth.js";
import {ElMessage} from "element-plus";


export function useRepassword() {
    const router = useRouter()
    const userStore = useUserStore()

    // 修改密码
    const formDrawerRef = ref(null)

    // 修改密码表单
    const form = reactive({
        oldpassword: "",
        password: "",
        repassword: ""
    })

    const formRef = ref(null)
    const onSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) {
                return false
            } else {
                formDrawerRef.value.showLoading()
                updatepassword(form).then(res => {
                    toast('修改密码成功，请重新登录')
                    userStore.logout()
                    router.push('./login')
                }).finally(() => {
                    formDrawerRef.value.hideLoading()
                })
            }
        })
    }

    const rules = {
        oldpassword: [
            {
                required: true,
                message: '旧密码不能为空',
                trigger: 'blur'
            },
        ],
        password: [
            {
                required: true,
                message: '新密码不能为空',
                trigger: 'blur'
            },
        ],
        repassword: [
            {
                required: true,
                message: '确认密码不能为空',
                trigger: 'blur'
            },
        ]
    }
    const openRePasswordRef = () => formDrawerRef.value.open()

    return {
        formDrawerRef,
        form,
        rules,
        formRef,
        onSubmit,
        openRePasswordRef
    }
}

export function useLogout() {
    const router = useRouter()
    const userStore = useUserStore()

    function handleLogout() {

        showModal('是否退出登录').then((res, rej) => {
            console.log('退出登录')
            logout()
        }).then(() => {
            // 移除cookie的token
            removeToken()
            // 清除用户状态
            userStore.logout()
            // 跳回登录页
            router.push('/login')
            ElMessage({
                type: 'success',
                message: '成功退出',
            })
        }).catch(() => {
            ElMessage({
                type: 'info',
                message: '取消退出',
            })
        })
    }

    return {
        handleLogout
    }
}



