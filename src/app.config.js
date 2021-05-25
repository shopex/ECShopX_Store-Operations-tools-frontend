export default {
  pages: [
    'pages/index/index',
    'pages/message/index',
    'pages/my/index',
    'pages/auth/login'
  ],
  tabBar: {
    list: [{
      pagePath: 'pages/index/index',
      text: '店铺'
    }, {
      pagePath: 'pages/message/index',
      text: '消息'
    }, {
      pagePath: 'pages/my/index',
      text: '我的'
    }]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
