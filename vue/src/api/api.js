import request from "@/network/request";
import {request_post_aop} from "@/network/request_post_aop";

//登录
export const login = data => {
    return request({
        method: 'POST',
        url: '/login/doLogin',
        data
    })
}


//加解密接口封装
export const post_aop = data => {
    return request_post_aop({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        method: 'POST',
        url: '/ed/login',
        data
    })
}

//获取后台公钥
export const getPublicKey = data => {
    return request({
        method: 'GET',
        url: 'rsa/getPublicKey',
        params: data
    })
}
