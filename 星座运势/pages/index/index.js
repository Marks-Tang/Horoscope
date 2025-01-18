// index.js - 首页逻辑
Page({
    data: {
        zodiacList: [
            {
                id: '白羊座',
                name: '白羊座',
                date: '3.21-4.19',
                icon: '/assets/白羊座.jpg'
            },
            { name: '金牛座', icon: '/assets/金牛座.jpg', date: '4.20-5.20' },
            { name: '双子座', icon: '/assets/双子座.jpg', date: '5.21-6.21' },
            { name: '巨蟹座', icon: '/assets/巨蟹座.jpg', date: '6.22-7.22' },
            { name: '狮子座', icon: '/assets/狮子座.jpg', date: '7.23-8.22' },
            { name: '处女座', icon: '/assets/处女座.jpg', date: '8.23-9.22' },
            { name: '天秤座', icon: '/assets/天秤座.jpg', date: '9.23-10.23' },
            { name: '天蝎座', icon: '/assets/天蝎座.jpg', date: '10.24-11.22' },
            { name: '射手座', icon: '/assets/射手座.jpg', date: '11.23-12.21' },
            { name: '摩羯座', icon: '/assets/摩羯座.jpg', date: '12.22-1.19' },
            { name: '水瓶座', icon: '/assets/水瓶座.jpg', date: '1.20-2.18' },
            { name: '双鱼座', icon: '/assets/双鱼座.jpg', date: '2.19-3.20' }
        ],
        // 当前选中的星座索引
        currentIndex: -1
    },

    onLoad() {
        // 页面加载时检查数据是否正确加载
        console.log('页面加载的星座数据：', this.data.zodiacList);
    },

    // 选择星座的事件处理
    onSelectZodiac(e) {
        const { index } = e.currentTarget.dataset;
        const zodiac = this.data.zodiacList[index];

        console.log('选中的星座信息:', zodiac); // 调试日志

        // 使用 wx.setStorageSync 存储选中的星座信息
        wx.setStorageSync('selectedZodiac', zodiac);

        // 直接传递name参数
        wx.navigateTo({
            url: `/pages/detail/detail?name=${encodeURIComponent(zodiac.name)}`,
            success: () => {
                console.log('页面跳转成功');
            },
            fail(err) {
                console.error('页面跳转失败:', err);
                wx.showToast({
                    title: '页面跳转失败',
                    icon: 'none'
                });
            }
        });
    }
})
