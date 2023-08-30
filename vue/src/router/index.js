// 路由相关
import Vue from 'vue'
import VueRouter from 'vue-router'

import login from "@/pages/login/login";

Vue.use(VueRouter)


const routes = [
    {
        path: '',
        redirect: '/index',
        meta: {title: "VUE项目"}
    },
    {
        path: '/',
        redirect: '/index',
        meta: {title: "VUE项目"}
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {title: "登录页面"}
    }
]


const router = new VueRouter({
    routes,
    mode: 'history', //配置路由方式 路由跳转必须使用this.$router.push() ,打包url跳转或刷新异常 ，需要使用nginx代理并修改配置文件
    baseUrl: '/'
});

// 路由导航守卫（拦截器）的作用就是控制页面的访问状态
// beforeEach 是全局前置守卫，任何页面的访问都要经过这里
// 守卫页面的导航的
// to：要去的路由信息
// from：来自哪里的路由信息
// next：放行方法
router.beforeEach((to, from, next) => {
    // 如果要访问的页面不是 /login，校验登录状态
    // 如果没有登录，则跳转到登录页面
    // 如果登录了，则允许通过
    // 允许通过
    // next()

    const user = JSON.parse(window.sessionStorage.getItem('communicationInfo'))

    // 校验非登录页面的登录状态
    if (to.path !== '/login') {
        if (to.path === '/registerIndex') {
            next()
            return
        }
        if (user != null) {
            let accessToken = user.data.token;
            if (accessToken != null) {
                // 已登录，允许通过
                next()
            } else {
                // 没有登录，跳转到登录页面
                console.log(to.fullPath);
                next(
                    {
                        path: '/login',
                        query: {redirect: to.fullPath} //把要跳转的地址作为参数传到下一步
                    })
            }
        } else {
            // 没有登录，跳转到登录页面
            console.log(to.fullPath);
            next(
                {
                    path: '/login',
                    query: {redirect: to.fullPath} //把要跳转的地址作为参数传到下一步
                })
        }

    } else {
        // 登录页面，正常允许通过
        next()
    }
    next()
})


export default router