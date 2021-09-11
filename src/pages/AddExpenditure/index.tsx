import Taro from "@tarojs/taro";
import React, { useEffect, useState } from 'react';
import { View, Text, Swiper, SwiperItem } from '@tarojs/components';
import { classItem } from '../../utils/json';
import { KeyBoard } from '../../components/KeyBoadr';
import { splitLineGroup } from '../../utils';
import './index.less';

const lineNum = 5;

const classData = splitLineGroup(classItem, lineNum);

const AddExpenditure = () => {

  const [classify, setClassify] = useState('canyin');

  const clickHandle = (value) => {
    Taro.vibrateShort();
    setClassify(value);
  }

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
    setTimeout(function () {
      Taro.hideLoading();
      Taro.navigateBack();
    }, 2000)
  }

  return (
    <View className='add-page-wrap border-box flex-column just-between'>
      <ClassList clickHandle={clickHandle} classify={classify} />
      <KeyBoard confirmPay={confirmPay} />
    </View>
  )
}

// 滑动区域
const ClassList = (props) => {
  const { clickHandle, classify } = props;
  return (
    <View className='swipe-wera'>
      <Swiper
        style={{ height: '230px' }}
        indicatorColor='#999'
        indicatorActiveColor='#333'
        indicatorDots
      >
        <SwiperItem>
          {
            Line({
              data: classData.slice(0, 2),
              clickHandle,
              classify
            })
          }
        </SwiperItem>
        <SwiperItem>
          {
            Line({
              data: classData.slice(2),
              clickHandle,
              classify
            })
          }
        </SwiperItem>
      </Swiper>
    </View>
  )
}

// 滑动行
const Line = (props) => {
  const { clickHandle, classify, data } = props;
  return data.map((line, index) => {
    return <View className='line-item flex just-between' key={index}>
      {
        line.map((key, i) => {
          return <ClassItem
            classify={classify}
            clickHandle={clickHandle}
            name={key}
            text={classItem[key]}
            key={i}
          />
        })
      }
    </View>
  })
}

// class项
const ClassItem = (props) => {
  const { clickHandle, classify } = props;
  const { name, text = '未知' } = props;
  return (
    <View onClick={() => clickHandle(name)} className='class-pay flex-column column-center'>
      <View className={`icon-pay flex column-center row-center  ${classify === name ? 'checked' : ''}`}>
        <Text
          // eslint-disable-next-line react/jsx-curly-brace-presence
          className={`icon iconfont icon-${name}`}
        ></Text>
      </View>
      <Text>{text}</Text>
    </View>
  )
}





export default AddExpenditure;
