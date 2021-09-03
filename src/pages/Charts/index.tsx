import React from 'react'
import { View } from '@tarojs/components'
import './index.less'
import { useAppData } from '../../utils/hooks';
import NavBar from '../../components/navBar';

const Charts = () => {
  const { title, navbarHeight } = useAppData();

  return (
    <>
      <NavBar title={title} />
      <View style={{marginTop:navbarHeight+'px'}}>图表</View>
    </>
  )
}

export default Charts;
