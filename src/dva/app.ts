import http from '../utils/http';

export default {
  namespace: 'app', // 这是模块名
  state: { // 初始化数据
    title: '胡萝卜记账',
    isLoading: false,
    systemData: {

    }
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
    * login(action, { call, put }) {
      const { error_code, data = [] } = yield call(http, '/v1/category/list', 'GET', {});
      if (error_code === 0) {
        yield put({
          type: 'setSysData', // 方法名
          payload: data,// 参数
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

  },
};