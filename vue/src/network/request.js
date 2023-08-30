import axios from 'axios'
import {MessageBox} from "element-ui";
import router from "@/router";

// 后台接口服务
// 我们通过这个实例去发请求，把需要的配置配置给这个实例来处理
const request = axios.create({
    // baseURL: '/api', // 请求的基础路径
    baseURL: 'https://sunbt.ltd/manager/',
    // baseURL: 'http://localhost:8888',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    timeout: 30000,
    // 定义后端返回的原始数据的处理
    // 参数 data 就是后端返回的原始数据（未经处理的 JSON 格式字符串）
    transformResponse: [function (data) {
        // Do whatever you want to transform the data
        // 后端返回的数据可能不是 JSON 格式字符串
        // 如果不是的话，那么 JSONbig.parse 调用就会报错
        // 所以我们使用 try-catch 来捕获异常，处理异常的发生
        // try {
        //     //如果转换成功，则直接把结果返回
        //     return JSONbig.parse(data)
        // } catch (err) {
        //     console.log('转换失败', err)
        //     //如果转换失败了，则进入这里
        //     我们在这里把数据原封不动的直接返回给请求使用
        //     return data
        // }
        // axios 默认在内部使用 JSON.parse 来转换处理原始数据
        return JSON.parse(data)
    }]
})

// 请求拦截器
request.interceptors.request.use(
    // 任何所有请求会经过这里
    // config 是当前请求相关的配置信息对象
    // config 是可以修改的
    config => {
        const user = JSON.parse(window.sessionStorage.getItem('communicationInfo'))
        // 如果有登录用户信息，则统一设置 token
        if (user) {
            config.headers.token = user.data.token;    //将token放到请求头发送给服务器
            return config;
        }
        return config
    },
    // 请求失败，会经过这里
    error => {
        return Promise.resolve(error)
    }
);
request.interceptors.response.use(res => {
        if (res.data.code !== undefined && res.data.code === 401) {
            MessageBox.confirm('当前登录已过期，请重新登陆！', '提示', {
                confirmButtonText: '确定',
                showCancelButton: false,
                type: 'warning'
            }).then(() => {
                router.push({
                    path: '/login'
                })
            })

        }
        return res
    },
    error => {
        if (error.response.status !== undefined && error.response.status === 401) {
            MessageBox.confirm('当前登录已过期，请重新登陆！', '提示', {
                confirmButtonText: '确定',
                showCancelButton: false,
                type: 'warning'
            }).then(() => {
                router.push({
                    path: '/login'
                })
            })

        } else {
            return Promise.resolve(error)
        }
    }
)
// 导出请求方法
export default request
