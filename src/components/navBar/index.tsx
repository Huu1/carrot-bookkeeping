import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { useDispatch, useSelector } from "react-redux";


import './index.less'
import { Loading } from "../Loading";


function NavBar(props) {
  const { back = false } = props;

  // 获取系统信息
  const systemInfo = Taro.getSystemInfoSync();

  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.app.isLoading);

  // 胶囊按钮位置信息
  const menuButtonInfo = Taro.getMenuButtonBoundingClientRect();

  // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
  const [info, setInfo] = useState([0, 0, 0, 0, '#FFF', '#000']);// 导航栏高度 ,胶囊距右方间距（方保持左、右间距一致）,胶囊距底部间距（保持底部间距一致）,胶囊高度（自定义内容可与胶囊高度保证一致）

  useEffect(() => {
    let _navBarHeight = ((menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight) || 0;
    let _menuRight = (systemInfo.screenWidth - menuButtonInfo.right) || 0;
    let _menuBotton = (menuButtonInfo.top - systemInfo.statusBarHeight) || 0;
    let _menuHeight = (menuButtonInfo.height) || 0;
    let _bgColor = '#FFF'; //背景
    let _color = '#000'; // 字体颜色
    if (props.bgColor) _bgColor = props.bgColor;
    if (props.color) _color = props.color;

    dispatch({
      type: 'app/setData',
      payload: {
        navbarHeight: _navBarHeight
      }
    })

    setInfo([_navBarHeight, _menuRight, _menuBotton / 2, _menuHeight, _bgColor, _color]);
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateBack = () => {
    Taro.navigateBack();
  }

  return (
    <View>
      <View className='nav-bar' style={{ height: `${info[0]}px`, }}>
        <View className='text'
          style={{
            height: `${info[3]}px`,
            minHeight: `${info[3]}px`,
            lineHeight: `${info[3]}px`,
            bottom: `${info[2]}px`,
            color: `${info[5]}`,
            background: info['color'],
          }}
        >
          {
            back && <Text className='back icon iconfont icon-fanhui' onClick={navigateBack}></Text>
          }
          {
            // loading && <Loading />
          }
          <Text style={{ marginLeft: '8px', display: 'inline-block' ,fontWeight:'bold'}}>
            {props.title}
          </Text>
        </View>
      </View>
      {/* 是否顶起顶部高度 */}
      {/* {
        props.seize ? <View className='content' style={{ height: `${info[0]}px` }}>sdfdf</View> : null
      } */}
    </View>
  );
}

export default NavBar;