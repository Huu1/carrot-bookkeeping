export default {
  pages: [
    'pages/index/index',
    'pages/Charts/index',
    'pages/userCenter/index',
    'pages/AddPay/index',
    "pages/TestPage/index",
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom',
    backgroundColor: "#fff",
  },
  tabBar: {
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
      },
      {
        pagePath: "pages/Charts/index",
        text: "图表",
      },
      {
        pagePath: "pages/userCenter/index",
        text: "个人中心",
      },
      {
        pagePath: "pages/TestPage/index",
        text: "测试页",
      }
    ]
  }
}
