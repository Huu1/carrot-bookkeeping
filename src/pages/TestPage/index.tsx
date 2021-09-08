import React, { useEffect, useState } from 'react';
import { View, Text } from '@tarojs/components';
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
      </View>
    </>
  )
}

export default Index;
