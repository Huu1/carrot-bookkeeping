import React, { useCallback, useEffect, useState } from 'react';
import Taro, { getCurrentPages, useDidShow, useReady, useRouter } from "@tarojs/taro";
import { View, Text } from '@tarojs/components';
import { PageLoading } from '../../components/PageLoading';
import { useRequest } from '../../utils/useHttp';
import TopPickerBar from '../../components/TopPickerBar';
import PayItem from '../../components/PayItem';
import { Empty } from '../../components/Empty';
import { Error } from '../../components/Error';
import './index.less';
import { dateFormat, setMonthValue } from '../../utils';

const pickHeight = 55;

export const initTime = dateFormat(new Date(), 'YYYY-mm');

const getMonthUrl = (date = initTime) => {
  return `/v1/expend/month/?date=${date}&time=${Date.now()}`;
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

  useDidShow(() => {
    console.log('didshow');

    const pages: any = getCurrentPages()
    const currPageData: any = pages[pages.length - 1].data
    const newDate = currPageData.newDate;

    if (newDate) {
      setDate(newDate);
      setUrl(getMonthUrl(newDate));
      currPageData.newDate = null;
    }
  })
  


  // 总览数据
  const { state, setUrl } = useRequest(getMonthUrl(), "GET", {});
  const { isLoading, isError, data } = state;

  const [dailyPay, setDailyPay] = useState<any>([]);
  const [sum, setSum] = useState<any>(0.00);

  useEffect(()=>{
    if(isLoading){
      Taro.showNavigationBarLoading()
    }else {
      Taro.hideNavigationBarLoading()
    }
  },[isLoading])

  useEffect(() => {
    const { data: { list = [], all } = { list: [], all: 0.00 } } = data;
    if (data) {
      setDailyPay(setMonthValue(list));
      setSum(all);
    }
  }, [data])

  const dateChangeHandle = (value: string) => {
    setDate(value)
    setDailyPay([]);
    setUrl(getMonthUrl(value));
  }

  const delCallback = useCallback((value) => {
    console.log(value);
  }, [])

  const pageStyle = {
    minHeight: `calc(100vh - 55px)`,
    background: '#f2f2f2',
    marginTop: `${pickHeight}px`
  }

  // 页面容器
  const PageContainer = React.memo((props) => {
    return (
      <>
        <View style={pageStyle}>
          <TopPickerBar date={date} sum={sum} style={{ height: `${pickHeight}px` }} dateChangeHandle={dateChangeHandle} />
          <View className='pay-list' style={{ marginTop: `${pickHeight}px` }}>
            {props.children}
          </View>
        </View>
        <AddPay />
      </>
    )
  })

  if (isLoading) {
    return (
      <PageContainer>
        {/* <View className='pageLoading'><PageLoading /></View> */}
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
