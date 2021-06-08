export default {
  pages: [
    'pages/index',
    'pages/message/index', // zyk 消息
    'pages/my/index', // zyk 我的信息
    'pages/auth/login',
    'pages/auth/index',
    'pages/order/list', //订单列表
    'pages/order/detail', //订单详情
    'pages/auth/agreement',
    'pages/auth/bindPhone',
    'pages/planSelection/index', // zyk 解决方案选择
    'pages/afterSaleTreatment/index' // zyk 售后处理
  ],
  tabBar: {
    list: [
      {
        pagePath: 'pages/index',
        iconPath: './assets/imgs/index/index.svg',
        selectedIconPath: './assets/imgs/index/indexHover.svg',
        text: '店铺'
      },
      {
        pagePath: 'pages/message/index',
        iconPath: './assets/imgs/index/message.svg',
        selectedIconPath: './assets/imgs/index/messageHover.svg',
        text: '消息'
      },
      {
        pagePath: 'pages/my/index',
        iconPath: './assets/imgs/index/myinfo.svg',
        selectedIconPath: './assets/imgs/index/myinfoHover.svg',
        text: '我的信息'
      }
    ],
    selectedColor: '#4980FF',
    backgroundColor: '#F5F5F5'
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
