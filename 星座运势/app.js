// app.js - 小程序入口文件
App({
    // 全局数据对象
    globalData: {
        // 用户信息
        userInfo: null,
        // 当前选中的星座
        selectedZodiac: null,
        // 是否已经获取过用户信息
        hasUserInfo: false
    },

    // 小程序启动时执行
    onLaunch() {
        // 这里可以进行一些初始化操作
        // 比如检查更新、获取用户信息等
    }
})
