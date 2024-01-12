import {defineStore} from 'pinia'
import {getInfo} from "~/api/manager.js";
import {removeToken} from "~/composable/auth.js";

export const useUserStore = defineStore('main',{
    state: () =>{
        return{
            user:{},
            // 侧边宽度
            asideWidth:'250px',
            menus:[],
            ruleNames:[]
        }
    },
    // 还可以写成state: () => ({ count: 0 }),
    actions: {
        // 记录用户信息
        SET_USERINFO(user) {
            this.user = user
        },
        SET_MENUS(menus){
            this.menus = menus
        },
        SET_RULENAMES(rulenames){
            this.ruleName = rulenames
        },
        // 获取当前登录用户信息
        getInfo(){
            return new Promise((resolve, reject)=>{
                getInfo().then((res)=>{
                    this.SET_USERINFO(res)
                    this.SET_MENUS(res.menus)
                    this.SET_RULENAMES(res.ruleNames)
                    console.log(res)
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        logout(){
        //     清除token
        //     removeToken()
        //     清除用户状态
            this.SET_USERINFO({})
        },
        handleAsideWidth(){
            this.asideWidth = this.asideWidth === '250px' ? '64px' : '250px'
        }
    },

})


