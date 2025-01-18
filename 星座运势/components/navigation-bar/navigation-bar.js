// navigation-bar.js - 底部导航栏组件
Component({
  // 组件的属性列表
  properties: {
    // 当前选中的tab索引
    current: {
      type: Number,
      value: 0
    }
  },

  // 组件的初始数据
  data: {
    // 导航项列表
    tabs: [
      {
        id: 'fortune',
        title: '星座运势',
        icon: '/assets/icons/fortune.png'
      },
      {
        id: 'future1',
        title: '敬请期待',
        icon: '/assets/icons/placeholder.png'
      },
      {
        id: 'future2',
        title: '敬请期待',
        icon: '/assets/icons/placeholder.png'
      }
    ]
  },

  // 组件的方法列表
  methods: {
    // 切换标签页
    switchTab(e) {
      const index = e.currentTarget.dataset.index;

      // 只允许切换到第一个tab
      if (index > 0) {
        wx.showToast({
          title: '功能开发中...',
          icon: 'none'
        });
        return;
      }

      // 触发父组件的事件监听
      this.triggerEvent('tabChange', { index });
    }
  }
})
