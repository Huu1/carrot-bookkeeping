import Taro from "@tarojs/taro";

const BASE_URL = 'http://localhost:9527';

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

        case 404:
          return reject(res);

        case 10014:
          return reject(res.data)

        // default:
      }
    }).catch(err => {
      console.log('error',err);
      return reject(err)
    })
  })
}

export default http;