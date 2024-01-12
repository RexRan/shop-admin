import {ref} from 'vue'
import {useRoute, onBeforeRouteUpdate, useRouter} from "vue-router";
import {useCookies} from "@vueuse/integrations/useCookies";


export function useTabList(){
    const route = useRoute()
    const router = useRouter()
    const cookie = useCookies()

    const activeTab = ref(route.path)
    const tabList = ref([
        {
            title: '后台首页',
            path: '/'
        },
        {
            title: '商城管理',
            path: '/goods/list'
        }

    ])

    onBeforeRouteUpdate((to, from) => {
        activeTab.value = to.path
        addTab({
            title: to.meta.title,
            path: to.path
        })
    })

// 添加标签导航
    function addTab(tab) {
        let noTab = tabList.value.findIndex(t => t.path === tab.path) === -1
        if (noTab) {
            tabList.value.push(tab)
        }
        // 防止刷新丢失
        cookie.set('tabList', tabList.value)
    }

    function initialTabList() {
        let tab = cookie.get('tabList')
        if (tab) {
            tabList.value = tab
        }
    }

    initialTabList()

    const changeTab = (tab) => {
        activeTab.value = tab
        console.log(tab)
        router.push(tab)
    }


    const removeTab = (targetName) => {
        // 获取当前标签页列表和活动标签页
        let tabs = tabList.value
        let active = activeTab.value

        // 如果关闭的是当前活动的标签页
        if (targetName === active) {
            // 遍历标签页列表
            tabs.forEach((tab, index) => {
                if (tab.path === targetName) {
                    // 如果存在下一个标签页，则将其设置为新的活动标签页，否则找上一个标签页
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        active = nextTab.path
                        changeTab(active)
                    }
                }
            })
        }
        // 更新活动标签页和标签页列表，移除关闭的标签页
        activeTab.value = active
        tabList.value = tabList.value.filter((tab) => tab.path !== targetName)

        // 将更新后的标签页列表保存到cookie中
        cookie.set('tabList', tabList.value)
    }

    const handleClose = (command)=>{
        if (command === 'clearAll'){
            // 切换回首页
            activeTab.value = '/'
            // 过滤只剩下首页
            tabList.value =[{
                title:'后台首页',
                path:'/'
            }]
        }else if (command === 'clearOther'){
            tabList.value = tabList.value.filter(tab => {
                return tab.path === '/' || tab.path === activeTab.value
            })
        }
        cookie.set('tabList', tabList.value)
    }

    return{
        activeTab,
        tabList,
        changeTab,
        removeTab,
        handleClose
    }
}