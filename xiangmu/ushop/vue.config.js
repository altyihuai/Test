// // 导出
// module.exports={
//     lintOnSave:false,
//     devServer: {
//         // 控制是否自动打开浏览器
//         // 设置端口号
//         prot:8888,
//         proxy:{
//             '/api':{
//                 target:'http://localhost:3000',
//             }
//         },
//         open:true,
//     }
// }

module.exports={
    // 修改资源文件加载方式为相对路径方式
    publicPath:'./',
    // 关闭eslint语法校验功能
    lintOnSave:false,
    //开发服务器
    devServer:{
        // 指定开发服务器默认监听端口
        port:8888,
        // 自动打开浏览器
        open:true,
        // 配置服务器代理
        proxy:{
            '/api':{
                target:'http://localhost:3000'
            }
        }
    }
}