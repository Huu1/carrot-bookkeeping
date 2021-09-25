import Taro, { getCurrentPages, useDidShow } from "@tarojs/taro";
import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text } from '@tarojs/components';
import TopPickerBar from '../../components/TopPickerBar';
import PayItem from '../../components/PayItem';
import { Empty } from '../../components/Empty';
import { Error } from '../../components/Error';
import { dateFormat, setMonthValue } from '../../utils';
import { delPayItem } from './service';
import './index.less';
import http from "../../utils/http";

const pickHeight = 55;

export const initTime = dateFormat(new Date(), 'YYYY-mm');

const getMonthUrl = (date = initTime) => {
  return `/v1/expend/month/?date=${date}`;
}

const Index = () => {
  const dispatch = useDispatch();

  useDidShow(() => {
    const pages: any = getCurrentPages();
    const currPageData: any = pages[pages.length - 1].data;
    const newDate = currPageData.newDate;
    if (newDate) {
      setDate(newDate);
      fetchData(newDate);
      currPageData.newDate = null;
    } else {
      fetchData(date);
    }
  })

  // 年月
  const [date, setDate] = useState<string>(initTime);
  const [{ sum, list }, setData] = useState({
    sum: 0,
    list: [],
  });
  const [{ isLoading, isError }, setStatus] = useState({
    isLoading: false,
    isError: false,
  })

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const fetchData = (date: any) => {
    Taro.showNavigationBarLoading();
    setStatus((p) => ({
      ...p,
      isLoading: true,
    }))
    http(getMonthUrl(date), 'GET', {}).then(res => {
      const { error_code: code, data: dataResult } = res;
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { sum = 0.00, budget, list = [] } = dataResult;
      if (code === 0) {
        dispatch({
          type: 'app/setBudget',
          payload: budget
        })
        setData({
          sum,
          list: setMonthValue(list),
        })
        setStatus((p) => ({
          ...p,
          isLoading: false,
        }))
      } else {
        setStatus((p) => ({
          isError: true,
          isLoading: false,
        }))
      }
    }).catch((res) => {
      console.log(res);
      setStatus((p) => ({
        ...p,
        isError: false,
      }))
    }).finally(() => {
      setStatus((p) => ({
        ...p,
        isLoading: false,
      }))
      Taro.hideNavigationBarLoading();
    })
  }

  const dateChangeHandle = (value: string) => {
    setDate(value);
    fetchData(value);
  }

  const delCallback = (id: number) => {
    Taro.showModal({
      title: '提示',
      content: '确定要删除这笔支出吗？',
      success: async function (res) {
        if (res.confirm) {
          const result = await delPayItem(id);
          // Taro.hideLoading();
          const { error_code, msg } = result;
          if (error_code === 0) {
            fetchData(date);
          } else {
            Taro.showToast({ title: msg });
          }
        }
      }
    })
  };

  const pageStyle = useMemo(() => ({
    minHeight: `calc(100vh - ${pickHeight}px)`,
    marginTop: `${pickHeight}px`,
    overFlow: "auto"
  }), [])

  return (
    <>
      <TopPickerBar date={date} sum={sum} height={pickHeight} dateChangeHandle={dateChangeHandle} />
      <View style={pageStyle}>
        {
          isError && <Error />
        }
        {
          !isError && !isLoading && list.length === 0 &&
          <Empty />
        }
        {
          list && list.length > 0 && list.map((item) => {
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
