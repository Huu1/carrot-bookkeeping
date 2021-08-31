import React, { useEffect } from 'react';
import Taro from "@tarojs/taro";
import { View } from '@tarojs/components';
import NavBar from "../../components/navBar";

import './index.less';
import { useAppData } from '../../utils/hooks';
import { useRequest } from '../../utils/useHttp';

const Index = () => {
  const { title, navbarHeight } = useAppData();

  const { state, setParam } = useRequest("/api/user/list", "GET", {});
  const { isLoading, isError, data } = state;
  
  return (
    <>
      <NavBar title={title} />
      <View className='page-container' style={{ marginTop: `${navbarHeight}px` }}>
        {
          isLoading && <View>loading....</View>
        }
        {
          isError && <View>error..</View>
        }
        {
          // data
        }
      </View>
    </>

  )
}

export default Index;
