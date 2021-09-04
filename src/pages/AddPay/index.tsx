import React, { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import './index.less'
import { useAppData } from '../../utils/hooks';
import NavBar from '../../components/navBar';
import { classItem } from '../../utils/json';
import { BOARD_HEIGHT, KeyBoard } from '../../components/KeyBoadr';

/**
 * [x,x,...] => [[x,x,x,x],[x,x,x,x],....]
 * @returns 
 */
const itemHandle = () => {
  const lineItem = 4;
  const result = [];
  const origin = Object.keys(classItem);
  let temp = [];
  origin.forEach((key, index) => {
    temp.push(key);
    if (temp.length === lineItem) {
      result.push([...temp]);
      temp = [];
    }
  })
  result.push([...temp]);
  temp = null;
  return result;
}

/**
 * 
 * @param navbarHeight 顶部高度
 * @param other 键盘高度
 * @returns 页面样式
 */
const getPageStyle = (navbarHeight: number, other: number | string = 0) => {
  return {
    marginTop: navbarHeight + 'px',
    height: `calc(100vh - ${navbarHeight}px - ${other})`
  }
}

const AddPay = () => {
  const { title, navbarHeight } = useAppData();

  // const
  const [classList] = useState(itemHandle());


  const [pageStlye, setPageStyle] = useState(getPageStyle(navbarHeight))

  const [showKeyboard, setShowKeyboard] = useState(false);

  const [classif, setClassif] = useState(null);

  const clickHandle = (value) => {
    setClassif(value);
    setShowKeyboard(true);
    setPageStyle(getPageStyle(navbarHeight, BOARD_HEIGHT))
  }

  return (
    <>
      <NavBar title={title} back />
      {
        showKeyboard && <KeyBoard />
      }
      <View className='add-page-wrap border-box' style={pageStlye}>
        {
          classList.map((line, lIndex) => {
            return (
              <View key={lIndex} className='line-item flex column-cemter just-between'>
                {
                  line.map((key, index) => {
                    return <ClassItem clickHandle={clickHandle} name={key} text={classItem[key]} key={index} />
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
  const { clickHandle } = props;
  const { name, text = '未知' } = props;
  return (
    <View onClick={() => clickHandle(name)} className='class-pay flex-column column-center'>
      <View className='icon-pay flex column-center row-center'>
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
