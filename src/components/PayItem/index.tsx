import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useCallback, useState } from "react";
import { SwipeAction } from "../SwipeAction";
import './index.less';

export const PayItem = (props) => {
  const { date = '8月12日', week = '星期五', dayValue = '230', items = [
    {
      info: "晚餐",
      value: "23.3",
      class: "dinner",
      id: '1'
    },
    {
      info: "交通",
      value: "2.3",
      class: "traffic",
      id: '2'
    },
  ] ,delCallback} = props;

  const onCallback = (id) => {
    Taro.showModal({
      title: '提示',
      content: '删除',
      success: function (res) {
        if (res.confirm) {
          Taro.showLoading({
            title: '加载中',
          })
          setTimeout(function () {
            delCallback(id);
            Taro.hideLoading()
            Taro.showToast({
              title: '成功',
              icon: 'success',
              duration: 1000
            })
          }, 2000)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

  return (
    <View className='container'>
      <View className='top-info border-box flex'>
        <Text className='icon iconfont icon-huluobu'></Text>
        <View className='time'>{date}</View>
        <View className='week'>{week}</View>
        <View className='value'>
          <Text >支出：</Text>
          <Text className='number' >{dayValue}</Text>
        </View>
      </View>
      {
        items.map((item, index) => {
          return (
            <SwipeAction key={item.key} id={item.id} onCallback={onCallback} >
              <View className='item border-box flex column-center'>
                <View className='icon'>
                  <Text className='icon iconfont icon-tongxun'></Text>
                </View>
                <View className='item-right border-box flex flex-1 just-between '>
                  <View className='info'>
                    {item.info}
                  </View>
                  <View className='value'>
                    {item.value}
                  </View>
                </View>
              </View>
            </SwipeAction>
          )
        })
      }
    </View>
  )
}