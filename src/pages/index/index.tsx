import React, { useEffect } from 'react';
import Taro from "@tarojs/taro";
import { View } from '@tarojs/components';
import NavBar from "../../components/navBar";

import './index.less';
import { useAppData } from '../../utils/hooks';
import { useRequest } from '../../utils/useHttp';
import { TopPickerBar } from '../../components/TopPickerBar';
import { DayPayItem } from '../../components/DayPayItem';

const Index = () => {
  const { title, navbarHeight } = useAppData();

  const { state, setParam } = useRequest("/api/user/list", "GET", {});
  const { isLoading, isError, data } = state;

  const Loading = () => isLoading && <View>loading....</View>;
  const Error = () => isError && <View>error..</View>;

  return (
    <>
      <NavBar title={title} />
      <View className='page-container' style={{ marginTop: `${navbarHeight}px` }}>
        {Loading()}
        {Error()}
        <TopPickerBar />
        <DayPayItem></DayPayItem>
        <DayPayItem></DayPayItem>
        <DayPayItem></DayPayItem>
        <DayPayItem></DayPayItem>
        <DayPayItem></DayPayItem>
      </View>
    </>

  )
}

export default Index;
