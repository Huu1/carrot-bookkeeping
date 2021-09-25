import React, { useCallback, useEffect, useState } from 'react'
import Taro, { useDidShow } from "@tarojs/taro";
import { View } from '@tarojs/components';
import ChartBar from '../../components/ChartBar';
import { PaySumItem } from '../../components/PaysumItem';
import { dateFormat } from '../../utils';
import http from '../../utils/http';
import PieChart from '../../components/Bar';
import { Empty } from '../../components/Empty';
import './index.less';

const barHeight = 40;
const style = {
  height: barHeight + 'px',
  top: '0'
}

const Charts = () => {

  const [param, setParam] = useState({
    date: dateFormat(new Date(), 'YYYY-mm'),
    mode: '0'
  });
  const { date, mode } = param

  const [data, setData] = useState([]);

  const [sum, setSum] = useState(0);

  useDidShow(() => {
    fetchData();
  })

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const fetchData = (modeValue: string = mode, dateValue: string = date) => {
    const params = {
      type: modeValue === '0' ? 'month' : 'year',
      date: dateValue
    }
    Taro.showNavigationBarLoading();
    http('/v1/expend/count', 'POST', params).then(res => {
      const { error_code: code, data: { list = [], sum: all = 0 } } = res;
      if (code === 0) {
        setData(list);
        setSum(all);
      }
    }).catch((res) => {
      console.log(res);
    }).finally(() => {
      Taro.hideNavigationBarLoading();
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onParamChange = (param: { date: any; mode: any; }) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { date, mode } = param;
    setParam(param);
    fetchData(mode, date);
  }

  const chartBar = () => {
    return <ChartBar sum={sum} onParamChange={onParamChange} param={param} style={style} />
  }

  return (
    <>
      {chartBar()}
      <View className='chartpage-wrap' style={
        {
          marginTop: `${barHeight}px`
        }
      }
      >
      </View>
      <View className='chart-wrap' >
        <PieChart data={data.map(i => {
          return {
            const: 'const',
            title: i.category.title,
            value: +i.value,
            ratio: (i.ratio * 100).toFixed(2)
          }
        })}
        />
      </View >
      <View className='out-title'>支出排行榜</View>
      <View className='contianer'>
        {
          data.map((item, index) => {
            return <PaySumItem item={item} key={index} />
          })
        }
      </View>
    </>

  )
}
export default Charts;


