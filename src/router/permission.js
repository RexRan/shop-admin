import {router, addRoutes} from "~/router/index.js";
import {getToken} from "~/composable/auth.js";
import {useUserStore} from "~/store/index.js";
import {hideFullLoading, showFullLoading} from "~/composable/util.js";
import {toast} from "~/composable/util.js";


//
let hasGetInfo =false
router.beforeEach(async (to, from, next) => {
    // 显示loading
    showFullLoading()
    const token = getToken()
    const userStore = useUserStore()

    // 没有登陆强制回到登录页
    if (!token && to.path !== '/login') {
        toast("请先登录", "error")
        return next({path: "/login"})
    }
    // 防止重复登陆
    if (token && to.path === '/login') {
        toast("请勿重复登录", "error")
        return next({path: from.path ? from.path : "/"})
    }

    let hasNewRoutes = false

    // 如果用户登录自动获取用户信息，存储在pinia
    // 刷新一次就请求一次，有没有办法优化？
    if (token && !hasGetInfo) {
        let { menus } = await userStore.getInfo()
        hasGetInfo = true
        // 添加动态路由
        hasNewRoutes = addRoutes(menus)

    }
    document.title = (to.meta.title ? to.meta.title : '') + '-后台管理'

    hasNewRoutes ? next(to.fullPath) : next()

})
// 全局后置守卫
router.afterEach((to, from) => {
    hideFullLoading()
})
