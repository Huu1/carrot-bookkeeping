import Taro from '@tarojs/taro';
import http, { BASE_URL } from '../utils/http';

export default {
  namespace: 'app', // 这是模块名
  state: { // 初始化数据
    title: '胡萝卜记账',
    isLoading: false,
    systemData: {},  // 类目信息
    budget: {}, // 月预算
    user: null,
  },
  effects: {
    // 异步方法, 在这里可以用put调用同步的方法
    // generator  这里的方法第二个参数都是{call, put }, call调用异步方法, put 可以调用reducers中的方法
    * getSysData(action, { call, put }) {
      const { error_code, data = [] } = yield call(http, '/v1/category/list', 'GET', {});
      if (error_code === 0) {
        yield put({
          type: 'setSysData', // 方法名
          payload: data,// 参数
        })
      }
    },
    * Login(action, { call, put }) {
      const { payload: user } = action;

      const { code, errMsg } = yield Taro.login();
      if (errMsg === 'login:ok') {
        const res = yield Taro.request({
          url: `${BASE_URL}/v1/token`,
          method: 'POST',
          data: {
            account: code,
            type: 100
          },
        })
        const { statusCode, data } = res;
        if (statusCode === 200) {
          Taro.setStorageSync('token', data.token);
          Taro.setStorageSync('userInfo', user);
          yield put({
            type: "setUser",
            payload: user
          })
        } else {
          const title = '服务器登录异常';
          Taro.showToast({
            title,
            icon: 'none'
          });
        }
      } else {
        Taro.showToast({
          title: errMsg,
          icon: 'none'
        })
      }
    },
  },

  reducers: { // 同步方法
    setData(state, { payload }) {
      return { ...state, ...payload };
    },
    setSysData(state, { payload }) {
      return { ...state, systemData: payload };
    },
    setBudget(state, { payload }) {
      return { ...state, budget: payload };
    },
    setUser(state, { payload }) {
      return { ...state, user: payload };
    },
  },
};