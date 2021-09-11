import React, { useEffect, useState } from 'react';
import Taro from "@tarojs/taro";
import { View, Text } from '@tarojs/components';
import { PageLoading } from '../../components/PageLoading';
import { useRequest } from '../../utils/useHttp';
import { TopPickerBar } from '../../components/TopPickerBar';
import { PayItem } from '../../components/PayItem';
import './index.less';

const pickHeight = 55;

const Index = () => {

  const [url, setUrl] = useState("/api/month");

  // 总览数据
  const { state } = useRequest(url, "GET", {});
  const { isLoading, isError, data } = state;

  const [dailyPay, setDailyPay] = useState<any>([]);

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

  const goPayPage = () => {
    Taro.navigateTo({ url: '/pages/AddExpenditure/index' })
  }

  const delCallback = (id) => {
    setUrl("/api/month?=" + Date.now())
  }

  const Loading = () => isLoading && <View className='pageLoading'><PageLoading /></View>;
  const Error = () => isError && <View>error..</View>;
  const Empty = () => !isLoading && dailyPay.length === 0 && <View className='flex-column column-center' style={{ paddingTop: '150px' }}>
    <Text style={{ fontSize: '80px' }} className='icon iconfont icon-wushuju'></Text>
    <View style={{ marginTop: '20px' }}>这里空空如也，赶紧记一笔吧</View>
  </View>

  const AddPay = () => {
    return (
      <View className='addPay flex column-center row-center' onClick={goPayPage}>
        <Text className='icon iconfont icon-add'></Text>
      </View>
    )
  }

  return (
    <>
      <View className={`page-container ${dailyPay.length ? 'home-wrap' : ''} `} >
        <TopPickerBar style={{ height: `${pickHeight}px` }} dateChangeHandle={dateChangeHandle} />
        {Error()}
        {Loading()}
        {Empty()}
        <View className='pay-list' style={{ marginTop: `${pickHeight}px` }}>
          {
            dailyPay.map((item, index) => {
              return <PayItem
                delCallback={delCallback}
                key={item.id}
                date={item.date}
                week={item.week}
                items={item.days}
              />
            })
          }
        </View>
      </View>
      <AddPay />
    </>
  )
}

export default Index;
