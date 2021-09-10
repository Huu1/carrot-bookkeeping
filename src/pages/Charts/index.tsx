import React, { useEffect } from 'react'
import { View } from '@tarojs/components';
import { ChartBar } from '../../components/ChartBar';
import { PaySumItem } from '../../components/PaysumItem';
import './index.less';
import { LineChart } from '../../components/lineChart';
import { SwipeAction } from '../../components/SwipeAction';

const barHeight = 40;

const Charts = () => {
  const style = {
    height: barHeight + 'px',
    top: '0'
  }
  const data = [
    {
      info: "晚餐",
      value: 32434,
      class: "dinner",
      sum: 3,
      ratio: 0.25
    },
    {
      info: "交通",
      value: 34,
      class: "交通",
      sum: 23,
      ratio: 0.46
    },
    {
      info: "消费1",
      value: 555,
      class: "交通",
      ratio: 0.12,
      sum: 22,
    },
    {
      info: "消费2",
      value: 22,
      class: "交通",
      ratio: 1,
      sum: 220,
    },
    {
      info: "消费3",
      value: 55,
      class: "交通",
      ratio: 0,
      sum: 110,
    },
  ];

  useEffect(() => {

  }, [])

  return (
    <>
      <ChartBar style={{ ...style }} />
      <View className='chartpage-wrap' style={
        {
          marginTop: `${barHeight}px`
        }
      }
      >
        <View className='chart-wrap'>
          <LineChart data={data.map(({ info, value }) => ({ info, value }))} />
        </View>
        <View className='out-title'>支出排行榜</View>
        <View className='contianer'>
          {
            data.map((item, index) => {
              return <PaySumItem item={item} key={index} />
            })
          }
        </View>

      </View>
    </>
  )
}

export default Charts;
