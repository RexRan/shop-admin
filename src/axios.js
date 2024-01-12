import axios from "axios";
import {getToken} from "~/composable/auth.js";
import {toast} from "~/composable/util.js";
import {useUserStore} from "~/store/index.js";


const service = axios.create({
    baseURL: '/api'
})

service.interceptors.request.use(
    (config) => {
        // 在发送请求之前做一些处理，例如添加请求头
        const token = getToken()
        // 如果已经登录自动传入token
        if (token) {
            config.headers['token'] = token
        }
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response) => {
        // 在响应之后做一些处理
        return response.data.data;
    },
    (error) => {
        const userStore = useUserStore()

        const msg = error.response.data.msg
        if (msg === '非法token,请先登录！'){
            userStore.logout().finally(()=> location.reload())
        }

        // 对响应错误做些什么
        toast(msg || '请求失败','error')

        return Promise.reject(error);
    }
);
export default service