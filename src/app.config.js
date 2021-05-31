export default {
  pages: [
    'pages/index',
    'pages/message/index',
    'pages/my/index',
    'pages/auth/login',
    'pages/auth/agreement',
    'pages/order/list',
    'pages/auth/welcome',
    'pages/auth/bindPhone'
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
        text: '我的'
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
