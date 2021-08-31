import Taro from "@tarojs/taro";

const BASE_URL = 'http://localhost:9999';

// api请求封装
const http = function (url: string, method: any, paramet: object) {

  // 获取token
  const token = Taro.getStorageSync('Info');

  return new Promise<{}>((resolve, reject) => {
    Taro.request({
      url: BASE_URL + url,
      data: paramet,
      method: method,
      header: {
        'content-type': 'application/json',
        'Authorization': token.accessToken ? token.accessToken : '',
      }
    }).then((res) => {
      // Taro.hideLoading()
      switch (res.data.statusCode) {
        case 200:
          return resolve(res.data)

        case 10014:
          // token校验失败
          // Taro.navigateTo({
          //   url: '/pages/login/index'
          // })
          // Taro.clearStorageSync()
          return reject(res.data)

        // default:
      }
    }).catch(err => {
      // Taro.showToast({
      //   title: '小程序数据请求失败',
      //   icon: 'none'
      // })
      return reject(err)
    })
  })
}

export default http;