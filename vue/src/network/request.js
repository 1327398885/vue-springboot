import axios from "axios";

const request = axios.create({
    baseURL: '/api', // 请求的基础路径
    timeout: 30000,
    // headers:{
    //     'Content-Type': 'application/json'
    // },
    // 定义后端返回的原始数据的处理
    // 参数 data 就是后端返回的原始数据（未经处理的 JSON 格式字符串）
    transformResponse: [function (data) {
        return data
    }]
})



// 导出请求方法
export {request}

