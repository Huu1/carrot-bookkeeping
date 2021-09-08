import React from 'react'
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
    top:'0'
  }
  const data = [
    {
      item: '餐饮',
      value: 141
    },
    {
      item: '餐饮2',
      value: 23
    },
    {
      item: '餐饮3',
      value: 4
    },
  ];

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
          <LineChart data={data} />
        </View>
        <View className='out-title'>支出排行榜</View>
        <View className='contianer'>
          <SwipeAction >
            <PaySumItem />
          </SwipeAction>
          <SwipeAction >
            <PaySumItem />
          </SwipeAction>
          <SwipeAction >
            <PaySumItem />
          </SwipeAction>
          <SwipeAction >
            <PaySumItem />
          </SwipeAction>
          <SwipeAction >
            <PaySumItem />
          </SwipeAction>
        </View>

      </View>
    </>
  )
}

export default Charts;
