import { createApp } from 'vue'
import ElementPlus from  'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import {router} from'./router'
import 'virtual:windi.css'
import {createPinia} from "pinia";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 最重要的一步，在全局路由守卫的的时候必须要在main.js 引入全局路由守卫的js代码
import './router/permission.js'

import 'nprogress/nprogress.css'

const app = createApp(App)

// 全局注册elementPlus Icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

const pinia = createPinia()

app.use(pinia)

app.use(router)

app.use(ElementPlus)



app.mount('#app')

