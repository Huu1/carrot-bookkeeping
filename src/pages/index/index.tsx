import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Taro from "@tarojs/taro";
import { View, Text } from '@tarojs/components';
import NavBar from "../../components/navBar";

import { useAppData } from '../../utils/hooks';
import { useRequest } from '../../utils/useHttp';
import { TopPickerBar } from '../../components/TopPickerBar';
import { DayPayItem } from '../../components/DayPayItem';
import { PayItem } from '../../components/PayItem';
import './index.less';

const pickHeight = 55;

const Index = () => {
  const dispatch = useDispatch();
  const { title, navbarHeight } = useAppData();
  const { state, setParam } = useRequest("/api/user/list", "GET", {});
  const { isLoading, isError, data } = state;
  const style = {
    top: navbarHeight + 'px',
    height: pickHeight + 'px'
  }

  useEffect(() => {
    dispatch({
      type: 'app/setData',
      payload: {
        isLoading: isLoading
      }
    })
  }, [isLoading, dispatch])

  const Loading = () => isLoading && <View>loading....</View>;
  const Error = () => isError && <View>error..</View>;

  return (
    <>
      <NavBar title={title} />
      <TopPickerBar style={style} />
      <View className='page-container home-wrap' style={{ marginTop: `${navbarHeight + pickHeight}px` }}>
        {Loading()}
        {Error()}
        <PayItem />
        <PayItem />
        <PayItem />
        <PayItem />
        <PayItem />
        <PayItem />
      </View>
    </>

  )
}

export default Index;
