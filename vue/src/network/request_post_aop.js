import axios from 'axios'
import aes from "@/util/aes";
import rsa from "@/util/rsa";
import qs from "qs";

// 我们通过这个实例去发请求，把需要的配置配置给这个实例来处理
//针对post请求，application/x-www-form-urlencoded
const request_post_aop = axios.create({
    baseURL: '/api', // 请求的基础路径
    timeout: 30000,
    // 定义后端返回的原始数据的处理
    // 参数 data 就是后端返回的原始数据（未经处理的 JSON 格式字符串）
    transformResponse: [function (data) {
        return data
    }]
})

// 请求拦截器（在请求之前进行一些配置）
request_post_aop.interceptors.request.use(
    // 任何所有请求会经过这里
    // config 是当前请求相关的配置信息对象
    // config 是可以修改的
    function (config) {
        // const user = JSON.parse(window.sessionStorage.getItem('token'))
        // // 如果有登录用户信息，则统一设置 token
        // if (user) {
        //     config.headers.Authorization = `Bearer ${user}`
        // }
        //获取前端RSA公钥密码、AES的key，并放到window
        let genKeyPair = rsa.genKeyPair();
        window.jsPublicKey = genKeyPair.publicKey;
        window.jsPrivateKey = genKeyPair.privateKey;
        var javaPublicKey = window.sessionStorage.getItem("javaPublicKey");
        let aesKey = aes.genKey();
        console.log(aesKey);
        let aesKeyRes = rsa.rsaEncrypt(aesKey, javaPublicKey);
        console.log("后端公钥：" + javaPublicKey);
        console.log("使用后端公钥加密的前端aes：" + aesKeyRes);
        let data = config.data;
        console.log("config:" + data)
        let dataRes = aes.encrypt(data, aesKey);
        console.log("使用前端AES加密的data：" + dataRes);
        console.log("前端公钥：" + window.jsPublicKey);
        console.log("前端私钥：" + window.jsPrivateKey);
        let jsPrivateKey = window.jsPrivateKey;
        jsPrivateKey = jsPrivateKey.replace("-----BEGIN RSA PRIVATE KEY-----\n", "");
        jsPrivateKey = jsPrivateKey.replace("\n-----END RSA PRIVATE KEY-----", "");
        console.log("前端私钥+new：" + jsPrivateKey);
        window.jsPrivateKey=jsPrivateKey;
        let jsPublicKey = window.jsPublicKey;
        jsPublicKey = jsPublicKey.replace("-----BEGIN PUBLIC KEY-----\n", "");
        jsPublicKey = jsPublicKey.replace("\n-----END PUBLIC KEY-----", "");
        console.log("前端公钥+new：" + jsPublicKey);
        window.jsPublicKey=jsPublicKey;
        let dataVo = {
            data: dataRes,
            aesKey: aesKeyRes,//后端RSA公钥加密后的AES的key
            publicKey: jsPublicKey//前端公钥,
        };
        config.data = qs.stringify(dataVo);

        console.log("config+data:" + config.data)
        return config
    },
    // 请求失败，会经过这里
    function (error) {
        return Promise.reject(error)
    }
)

//响应了拦截器（在响应之后对数据进行一些处理）
request_post_aop.interceptors.response.use(res=>{
    let parse = JSON.parse(res.data);
    console.log(parse.data);
    let bkAes = rsa.rsaDecrypt(parse.data.aesKey, window.jsPrivateKey);
    console.log("使用前端私钥获取后端aesKey：" + bkAes);
    return aes.decrypt(parse.data.data, bkAes)
})


// 导出请求方法
export {request_post_aop}
