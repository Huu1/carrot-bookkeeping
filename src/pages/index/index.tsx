import React, { useEffect, useState } from 'react';
import Taro from "@tarojs/taro";
import { View, Text } from '@tarojs/components';
import { PageLoading } from '../../components/PageLoading';
import { useRequest } from '../../utils/useHttp';
import { TopPickerBar } from '../../components/TopPickerBar';
import PayItem from '../../components/PayItem';
import { Empty } from '../../components/Empty';
import { Error } from '../../components/Error';
import './index.less';
import { dateFormat, setMonthValue } from '../../utils';

const pickHeight = 55;

export const initTime = dateFormat(new Date(), 'YYYY-mm');

const getMonthUrl = (date = initTime) => {
  return `/v1/expend/month/?date=${date}`;
}

// 添加支出
const AddPay = () => {

  const goPayPage = () => {
    Taro.navigateTo({ url: '/pages/AddExpenditure/index' })
  }
  return (
    <View className='addPay flex column-center row-center' onClick={goPayPage}>
      <Text className='icon iconfont icon-add'></Text>
    </View>
  )
}


const Index = () => {

  const [date, setDate] = useState<string>(initTime);

  // 总览数据
  const { state, setUrl } = useRequest(getMonthUrl(), "GET", {});
  const { isLoading, isError, data } = state;

  const [dailyPay, setDailyPay] = useState<any>([]);

  useEffect(() => {
    const { data: { list = [], sum } = { list: [], sum: 0 } } = data;
    if (data) {
      setDailyPay(setMonthValue(list));
    }
  }, [data])

  const dateChangeHandle = (value: string) => {
    setDate(value)
    setDailyPay([]);
    setUrl(getMonthUrl(value));
  }

  const delCallback = (id) => {
    // setUrl("/api/month?=" + Date.now())
  }

  // 页面容器
  const PageContainer = (props) => {
    return (
      <>
        <View style={{ marginTop: `${pickHeight}px` }}>
          <TopPickerBar date={date} style={{ height: `${pickHeight}px` }} dateChangeHandle={dateChangeHandle} />
          <View className='pay-list' style={{ marginTop: `${pickHeight}px` }}>
            {props.children}
          </View>
        </View>
        <AddPay />
      </>
    )
  }

  if (isLoading) {
    return (
      <PageContainer>
        <View className='pageLoading'><PageLoading /></View>
      </PageContainer>
    )
  }

  if (!isError && !isLoading && dailyPay.length === 0) {
    return (
      <PageContainer >
        <Empty />
      </PageContainer>
    )
  }

  if (isError) {
    return (
      <PageContainer >
        <Error />
      </PageContainer>
    )
  }

  if (dailyPay && dailyPay.length) {
    return (
      <PageContainer>
        {
          dailyPay.map((item, index) => {
            return <PayItem
              delCallback={delCallback}
              key={item.id}
              data={item}
            />
          })
        }
      </PageContainer>
    )
  }
}

export default Index;
