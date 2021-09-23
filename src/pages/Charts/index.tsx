import React, { useEffect, useState } from 'react'
import Taro from "@tarojs/taro";
import { View } from '@tarojs/components';
import { ChartBar } from '../../components/ChartBar';
import { PaySumItem } from '../../components/PaysumItem';
import { dateFormat } from '../../utils';
import http from '../../utils/http';
import PieChart from '../../components/Bar';
import './index.less';
import { Empty } from '../../components/Empty';

const barHeight = 40;
const style = {
  height: barHeight + 'px',
  top: '0'
}

const Charts = () => {


  const [date, setDate] = useState(dateFormat(new Date(), 'YYYY-mm'));

  const [mode, setMode] = useState('0');

  const [data, setData] = useState([]);

  const [sum, setSum] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const param = {
      type: mode === '0' ? 'month' : 'year',
      date: date
    }
    Taro.showNavigationBarLoading();
    setLoading(true);
    http('/v1/expend/count', 'POST', param).then(res => {
      const { error_code: code, data: { list = [], sum: all = 0 } } = res;
      if (code === 0) {
        setData(list);
        setSum(all);
      }
    }).catch((res) => {
      console.log(res);
    }).finally(() => {
      setLoading(false);
      Taro.hideNavigationBarLoading();
    })
  }, [date, mode])

  return (
    <>
      <ChartBar sum={sum} setDate={setDate} setMode={setMode} date={date} mode={mode} style={style} />
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
            value: +i.value
          }
        })}
        />
        <View className='out-title'>支出排行榜</View>
        <View className='contianer'>
          {
            data.map((item, index) => {
              return <PaySumItem item={item} key={index} />
            })
          }
        </View>
      </View >
    </>

  )
}
export default Charts;


