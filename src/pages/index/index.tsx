import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Taro from "@tarojs/taro";
import { View, Text } from '@tarojs/components';
import NavBar from "../../components/navBar";
import { PageLoading } from '../../components/PageLoading';
import { useAppData } from '../../utils/hooks';
import { useRequest } from '../../utils/useHttp';
import { TopPickerBar } from '../../components/TopPickerBar';
import { PayItem } from '../../components/PayItem';
import './index.less';

const pickHeight = 55;

const Index = () => {
  const dispatch = useDispatch();

  // 页标题 和页顶高度
  const { title, navbarHeight } = useAppData();


  const [url, setUrl] = useState("/api/month")

  // 总览数据
  const { state } = useRequest(url, "GET", {});
  const { isLoading, isError, data } = state;

  const [dailyPay, setDailyPay] = useState([]);


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

  useEffect(() => {
    const { data: value } = data;
    if (value) {
      setDailyPay(value);
    }
  }, [data])

  const dateChangeHandle = (dateValue) => {
    setDailyPay([]);
    setUrl("/api/month?=" + Date.now())
  }

  const goPayPage=()=>{
    Taro.navigateTo({url:'/pages/AddPay/index'})
  }

  const Loading = () => isLoading && <View className='pageLoading'><PageLoading /></View>;
  const Error = () => isError && <View>error..</View>;

  const AddPay = () => {
    return (
      <View className='addPay flex column-center row-center' onClick={goPayPage}>
        <Text className='icon iconfont icon-add'></Text>
      </View>
    )
  }

  return (
    <>
      <NavBar title={title} />
      <TopPickerBar dateChangeHandle={dateChangeHandle} style={style} />
      <AddPay />
      <View className='page-container home-wrap' style={{ marginTop: `${navbarHeight + pickHeight}px` }}>
        {Error()}
        {Loading()}
        {
          dailyPay.map((item, index) => {
            return <PayItem
              key={index}
              date={item.date}
              week={item.week}
              items={item.days}
            />
          })
        }
      </View>
    </>

  )
}

export default Index;
