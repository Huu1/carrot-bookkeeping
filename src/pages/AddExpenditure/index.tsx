import Taro, { getCurrentPages } from "@tarojs/taro";
import { useSelector } from "react-redux";
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { View, Text, Swiper, SwiperItem } from '@tarojs/components';
import { KeyBoard } from '../../components/KeyBoadr';
import { splitLineGroup } from '../../utils';
import './index.less';
import http from "../../utils/http";

const lineNum = 5;

const ThemeContext = React.createContext({
  classify: 1,
  clickHandle: (data): any => { }
});

const AddExpenditure = () => {

  const { systemData = [] } = useSelector((state: any) => state.app);

  const classData = useMemo(() => {
    return splitLineGroup(systemData, lineNum)
  }, [systemData])

  const [classify, setClassify] = useState(1);

  const clickCallback = useCallback((value) => {
    // Taro.vibrateShort();
    setClassify(value);
  }, [])


  const confirmPay = (data: { value: string, date: string, tip: string }) => {
    const { tip, date, value } = data;
    if (!value || value.charAt(value.length - 1) === '.' || value === '0') {
      Taro.showToast({
        title: '请输入正确的金额',
        icon: 'none',
        mask: true,
        duration: 1500
      })
      return;
    }
    Taro.showLoading({
      title: '加载中',
    })
    const formatDate = date.replace(/\//g, "-")
    http('/v1/expend/add', 'POST', {
      value,
      categoryId: classify,
      date:formatDate,
      describe: tip
    }).then(res => {
      const { error_code, msg } = res;
      if (error_code === 0) {
        const pages: any = getCurrentPages()
        const prevPage: any = pages[pages.length - 2]
        const [year, month] = formatDate.split('-')
        prevPage.setData({
          newDate: year + '-' + month
        })
        Taro.navigateBack({
          delta: 1
        })
      } else {
        Taro.showToast({
          title: msg
        })
      }
    }).catch(res => {
      Taro.showToast({
        title: res
      })
    }).finally(() => {
      Taro.hideLoading();
    })
  }

  return (
    <ThemeContext.Provider value={{ classify, clickHandle: clickCallback }}>
      <View className='add-page-wrap border-box flex-column just-between'>
        <ClassList classData={classData} />
        <KeyBoard confirmPay={confirmPay} />
      </View>
    </ThemeContext.Provider>
  )
}

// 滑动区域
const ClassList = React.memo((props: { classData: any[] }) => {
  const { classData } = props;
  return (
    <View className='swipe-wera'>
      <Swiper
        style={{ height: '230px' }}
        indicatorColor='#999'
        indicatorActiveColor='#333'
        indicatorDots
      >
        <SwiperItem>

          <Line param={{
            data: classData.slice(0, 2)
          }}
          />
        </SwiperItem>
        <SwiperItem>
          <Line param={{
            data: classData.slice(2)
          }}
          />
        </SwiperItem>
      </Swiper>
    </View>
  )
})

// 滑动行
const Line = (props: any) => {
  const { data: LineData } = props.param;
  return LineData.map((line, index) => {
    return <View className='line-item flex just-between' key={index}>
      {
        line.map((category, i) => {
          return <ClassItem
            category={category}
            key={i}
          />
        })
      }
    </View>
  })
}

// class项
const ClassItem = React.memo((props: any) => {
  const { category } = props;

  const { classify, clickHandle } = useContext(ThemeContext);


  return useMemo(() => {
    return <MemorizeItem clickHandle={clickHandle} category={category} classify={classify} />;
  }, [category, classify, clickHandle])
})


const MemorizeItem = React.memo((props: any) => {
  const { clickHandle, classify, category } = props;
  const { title, icon, id } = category;
  return (
    <View onClick={() => clickHandle(id)} className='class-pay flex-column column-center'>
      <View className={`icon-pay flex column-center row-center  ${classify === id ? 'checked' : ''}`}>
        <Text
          // eslint-disable-next-line react/jsx-curly-brace-presence
          className={`icon iconfont icon-${icon}`}
        ></Text>
      </View>
      <Text>{title}</Text>
    </View>
  )
})

export default AddExpenditure;
