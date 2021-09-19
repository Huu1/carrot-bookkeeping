import Taro from "@tarojs/taro";
import { encodeToken } from './index';

// export const BASE_URL = 'http://192.168.31.98:10086';
export const BASE_URL = 'http://192.168.0.106:10086';

// api请求封装
const http = function (url: string, method: any, paramet: object) {

  // 获取token
  const token = Taro.getStorageSync('token');

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const setParam = (url, method, paramet) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    return function (resolve = (data) => { }, reject = (data) => { }, token: string) {
      Taro.request({
        url: BASE_URL + url,
        data: paramet,
        method: method,
        header: {
          'content-type': 'application/json',
          'Authorization': encodeToken(token),
        }
      }).then((res) => {
        // Taro.hideLoading()
        switch (res.statusCode) {
          case 200:
            return resolve(res.data)
          case 404:
            return reject(res);
          case 403:
            return reject(res.data);
          // default:
        }
      }).catch(err => {
        console.log('error', err);
        return reject(err);
      })
    }
  }

  const featchData = setParam(url, method, paramet);

  return new Promise<any>((resolve, reject) => {
    if (!token) {
      Taro.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求
            Taro.request({
              url: `${BASE_URL}/v1/token`,
              method: 'POST',
              data: {
                account: res.code,
                type: 100
              },
              success: function (params) {
                const { statusCode, data } = params;
                if (statusCode === 200) {
                  Taro.setStorageSync('token', data.token);
                  return featchData(resolve, reject, data.token);
                } else {
                  const title = '服务器登录异常';
                  Taro.showToast({
                    title,
                    icon: 'none'
                  });
                  return reject(title);
                }
              },
              fail: function (params) {
                const title = '登录失败';
                Taro.showToast({
                  title
                });
                return reject(title);
              }
            })
          } else {
            const title = '获取小程序code失败'
            Taro.showToast({
              title
            });
            return reject(title);
          }
        }
      })
    } else {
      console.log('已登录');
      return featchData(resolve, reject, token);
    }
  })
}


export default http;