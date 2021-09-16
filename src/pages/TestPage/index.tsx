import React, { useEffect, useState } from 'react';
import Taro ,{ useReady }from "@tarojs/taro";
import { useSelector } from 'react-redux';
import { View, Text, Swiper, SwiperItem, MovableArea, MovableView, Button } from '@tarojs/components';
import NavBar from "../../components/NavBar";
import { useAppData, useNavInfo } from '../../utils/hooks';
import { SwipeAction } from '../../components/SwipeAction';

const pickHeight = 55;

const splitLineGroup = (Items, lineItem: number = 4) => {
  const result: any = [];
  let temp: any = [];
  Items.forEach((c) => {
    temp.push(c);
    if (temp.length === lineItem) {
      result.push([...temp]);
      temp = [];
    }
  })
  result.push([...temp]);
  temp = null;
  console.log(result);

  return result;
}

const Index = () => {

  // 页标题 和页顶高度
  const { title, navbarHeight } = useAppData();

  const { appHeaderHeight } = useNavInfo();


  const clickHandlke= () => {
    Taro.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);

      }
    })
  }

  const style = {
    top: navbarHeight + 'px',
    height: pickHeight + 'px'
  }

  const { systemData = [] } = useSelector((state: any) => state.app);

  splitLineGroup(systemData);

  return (
    <>
      <NavBar />
      <Button onClick={clickHandlke}>click</Button>
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

        <MovableArea style='height: 200px; width: 200px; background: red;'>
          <MovableView style='height: 50px; width: 50px; background: blue;' direction='all'>旅行的意义</MovableView>
        </MovableArea>
      </View>
    </>
  )
}

export default Index;
