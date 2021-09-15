export default {
  pages: [
    'pages/index/index',
    'pages/Charts/index',
    'pages/userCenter/index',
    'pages/AddPay/index',
    'pages/AddExpenditure/index',
    "pages/TestPage/index",
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffc300',
    navigationBarTitleText: '胡萝卜记账',
    navigationBarTextStyle: 'black',
    // navigationStyle: 'custom',
    backgroundColor: "#f2f2f2",
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
      // {
      //   pagePath: "pages/AddExpenditure/index",
      //   text: "新增支出",
      // },
      {
        pagePath: "pages/TestPage/index",
        text: "测试页",
      }
    ]
  }
}
