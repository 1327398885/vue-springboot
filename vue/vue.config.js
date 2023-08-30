module.exports = {
    runtimeCompiler: true,
    // or
    chainWebpack: (config) => {
        config.resolve.alias
            .set("vue$", "vue/dist/vue.esm.js");
    },
    configureWebpack: {
        resolve: {
            alias: {
                'network': '@/network',
                'components': '@/components'
            }
        }
    },
    productionSourceMap: false,// 打包时去掉sourceMap
    lintOnSave: false,
    publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
    // publicPath:'/',
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 8000,
        https: false,
        hotOnly: false,
        // proxy: null
        proxy: {
            '/api': {
                target: 'https://sunbt.ltd/manager/',//请求地址
                ws: true,
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' //请求地址
                }
            },
        }
    }
}