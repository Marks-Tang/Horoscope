// 引入 API
const { getFortune } = require('../../utils/api.js')

Page({
    data: {
        zodiacInfo: null,
        fortune: {
            overall: '',
            love: '',
            career: '',
            wealth: '',
            foods: []
        }
    },

    onLoad(options) {
        console.log('接收到的参数:', options); // 调试日志

        if (!options.name) {
            console.error('未接收到星座名称');
            wx.showToast({
                title: '参数错误',
                icon: 'none'
            });
            return;
        }

        // 从缓存获取完整的星座信息
        const zodiacInfo = wx.getStorageSync('selectedZodiac');
        console.log('缓存中的星座信息:', zodiacInfo); // 调试日志

        this.setData({
            zodiacInfo: zodiacInfo
        });

        // 解码并获取运势
        const name = decodeURIComponent(options.name);
        console.log('解码后的星座名称:', name); // 调试日志

        this.getFortuneData(name);
    },

    getFortuneData(name) {
        if (!name) {
            console.error('星座名称为空');
            return;
        }

        console.log('开始获取运势，星座名称:', name); // 调试日志

        wx.showLoading({
            title: '获取运势中...'
        });

        getFortune(name)
            .then(res => {
                console.log('获取运势成功:', res);
                this.setData({
                    fortune: res
                });
            })
            .catch(err => {
                console.error('获取运势失败:', err);
                wx.showToast({
                    title: '获取运势失败',
                    icon: 'none'
                });
            })
            .finally(() => {
                wx.hideLoading();
            });
    },

    goBack() {
        wx.navigateBack({
            delta: 1
        });
    }
}) 