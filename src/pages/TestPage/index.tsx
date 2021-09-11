import React, { useEffect, useState } from 'react';
import { View, Text, Swiper, SwiperItem } from '@tarojs/components';
import NavBar from "../../components/NavBar";
import { useAppData, useNavInfo } from '../../utils/hooks';
import { TopPickerBar } from '../../components/TopPickerBar';
import { SwipeAction } from '../../components/SwipeAction';

const pickHeight = 55;

const Index = () => {

  // 页标题 和页顶高度
  const { title, navbarHeight } = useAppData();

  const { appHeaderHeight } = useNavInfo();

  console.log(appHeaderHeight);

  const style = {
    top: navbarHeight + 'px',
    height: pickHeight + 'px'
  }

  return (
    <>
      <NavBar />
      <TopPickerBar style={style} />
      <View style={{ marginTop: `${navbarHeight + pickHeight}px` }}>
        <SwipeAction >
          <View style={{ height: "40px", background: "skyblue" }}>
            dsfdsfadsffffffffffffffffffffsdf
          </View>
        </SwipeAction>

        <Swiper
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay
        >
          <SwiperItem>
            <View className='demo-text-1'>1</View>
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text-2'>2</View>
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text-3'>3</View>
          </SwiperItem>
        </Swiper>
      </View>
    </>
  )
}

export default Index;
