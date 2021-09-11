import React, { useEffect, useState } from 'react';
import Taro from "@tarojs/taro";
import { View, Text } from '@tarojs/components'
import './index.less'
import { useAppData } from '../../utils/hooks';
import NavBar from '../../components/navBars';
import { classItem } from '../../utils/json';
import { BOARD_HEIGHT, KeyBoard } from '../../components/KeyBoadr';
import { splitLineGroup } from '../../utils';


/**
 * 
 * @param navbarHeight 顶部高度
 * @param other 键盘高度
 * @returns 页面样式
 */
const getPageStyle = (navbarHeight: number, other: number | string = 0) => {
  return {
    height: `calc(100vh  - ${other})`
  }
}

const AddPay = () => {
  const { title, navbarHeight } = useAppData();

  // const
  const [classList] = useState(splitLineGroup(classItem));


  const [pageStlye, setPageStyle] = useState(getPageStyle(navbarHeight))

  const [showKeyboard, setShowKeyboard] = useState(false);

  const [classify, setClassify] = useState(null);

  const clickHandle = (value) => {
    setClassify(value);
    setShowKeyboard(true);
    setPageStyle(getPageStyle(navbarHeight, BOARD_HEIGHT))
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
    <>
      {/* <NavBar title={title} back /> */}
      {
        showKeyboard && <KeyBoard confirmPay={confirmPay} />
      }
      <View className='add-page-wrap border-box' style={pageStlye}>
        {
          classList.map((line, lIndex) => {
            return (
              <View key={lIndex} className='line-item flex column-cemter just-between'>
                {
                  line.map((key, index) => {
                    return <ClassItem classify={classify} clickHandle={clickHandle} name={key} text={classItem[key]} key={index} />
                  })
                }
              </View>
            )
          })
        }
      </View>
    </>
  )
}

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


export default AddPay;
