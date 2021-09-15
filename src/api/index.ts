import Taro from '@tarojs/taro';
import { BASE_URL } from '../utils/http';


export const getSysData = () => {
  return Taro.request({
    url: BASE_URL + '/v1/category/list',
    method: 'GET',
    header: {
      'content-type': 'application/json',
    }
  })
}