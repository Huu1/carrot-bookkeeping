import React from 'react'
import { View } from '@tarojs/components';
import { useAppData } from '../../utils/hooks';
import NavBar from '../../components/navBar';
import { ChartBar } from '../../components/ChartBar';
import { PaySumItem } from '../../components/PaysumItem';
import './index.less';
import { LineChart } from '../../components/lineChart';

const barHeight = 35;

const Charts = () => {
  const { title, navbarHeight } = useAppData();

  const style = {
    top: navbarHeight + 'px',
    height: barHeight + 'px'
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
      <NavBar title={title} />
      <ChartBar style={{ ...style }} />

      <View className='chartpage-wrap' style={
        {
          marginTop: `${navbarHeight + barHeight}px`
        }
      }
      >
        <View className='chart-wrap'>
          <LineChart data={data} />
        </View>
        <View className='contianer'>
          <PaySumItem />
          <PaySumItem />
          <PaySumItem />
          <PaySumItem />
          <PaySumItem />
        </View>

      </View>
    </>
  )
}

export default Charts;
