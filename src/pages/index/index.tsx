import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Taro, { getCurrentPages, useDidShow, } from "@tarojs/taro";
import { View, Text } from '@tarojs/components';
import { useRequest } from '../../utils/useHttp';
import TopPickerBar from '../../components/TopPickerBar';
import PayItem from '../../components/PayItem';
import { Empty } from '../../components/Empty';
import { Error } from '../../components/Error';
import './index.less';
import { dateFormat, setMonthValue } from '../../utils';
import { delPayItem } from './service';

const pickHeight = 55;

export const initTime = dateFormat(new Date(), 'YYYY-mm');

const getMonthUrl = (date = initTime) => {
  return `/v1/expend/month/?date=${date}&time=${Date.now()}`;
}


const Index = () => {

  useDidShow(() => {
    const pages: any = getCurrentPages();
    const currPageData: any = pages[pages.length - 1].data;
    const newDate = currPageData.newDate;
    if (newDate) {
      setDate(newDate);
      setUrl(getMonthUrl(newDate));
      currPageData.newDate = null;
    }
  })

  // 总览数据
  const { state, setUrl } = useRequest(getMonthUrl(), "GET", {});
  const { isLoading, isError, data: dataResult } = state;

  // 年月
  const [date, setDate] = useState<string>(initTime);

  const monthData = useMemo(() => {
    const { data: { list = [] } = { list: [] } } = dataResult;
    return setMonthValue(list);
  }, [dataResult]);

  const sum = useMemo(() => {
    const { data: { all } = { all: 0.00 } } = dataResult;
    return all;
  }, [dataResult]);


  const dateChangeHandle = useCallback((value: string) => {
    setDate(value);
    setUrl(getMonthUrl(value));
  }, [setUrl])

  const delCallback = useCallback((id: number) => {
    Taro.showModal({
      title: '提示',
      content: '确定要删除这笔支出吗？',
      success: async function (res) {
        if (res.confirm) {
          // Taro.showLoading({
          //   title: '加载中',
          // })
          const result = await delPayItem(id);
          // Taro.hideLoading();
          const { error_code, msg } = result;
          if (error_code === 0) {
            setUrl(getMonthUrl(date));
          } else {
            Taro.showToast({ title: msg });
          }
        }
      }
    })
  }, [date, setUrl]);

  const pageStyle = useMemo(() => ({
    minHeight: `calc(100vh - ${pickHeight}px)`,
    marginTop: `${pickHeight}px`
  }), [])

  return (
    <>
      <TopPickerBar date={date} sum={sum} height={pickHeight} dateChangeHandle={dateChangeHandle} />
      <View style={pageStyle}>
        {
          isError && <Error />
        }
        {
          !isError && !isLoading && monthData.length === 0 && <Empty />
        }
        {
          monthData && monthData.length > 0 && monthData.map((item) => {
            return <PayItem
              delCallback={delCallback}
              key={item.id}
              data={item}
            />
          })
        }
      </View>
      <AddPay />
    </>
  )
}


// 添加支出
const AddPay = React.memo(() => {
  const goPayPage = () => {
    Taro.navigateTo({ url: '/pages/AddExpenditure/index' })
  }
  return (
    <View className='addPay flex column-center row-center' onClick={goPayPage}>
      <Text className='icon iconfont icon-add'></Text>
    </View>
  )
})

export default Index;
