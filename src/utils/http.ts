import Taro from "@tarojs/taro";
import { dvaApp } from "../app";
import { encodeToken } from './index';


export const BASE_URL = 'http://192.168.31.98:10086';
// export const BASE_URL = 'http://192.168.0.109:10086';

const notAuthApi = [
  '/v1/category/list'
]


// api请求封装
const http = function (url: string, method: any, paramet: object) {

  // 获取token
  const token = Taro.getStorageSync('token');
  if (!token && !notAuthApi.includes(url)) {
    Taro.showToast({
      icon: "none",
      title: "请到我的页面~登录获得授权后，即可使用此功能"
    })
    return Promise.reject({ info: '未登录' });
  }

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
            return resolve(res.data);
          case 404:
            return reject(res);
          case 401:
            Taro.removeStorageSync('userInfo');
            Taro.showToast({
              icon: "none",
              title: "请到我的页面~登录获得授权后，即可使用此功能"
            })
            const store = dvaApp.getStore();
            store.dispatch({
              type: 'app/setUser',
              payload: null
            })
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
    return featchData(resolve, reject, token);
  })
}


export default http;