import { View, Text } from "@tarojs/components";
import React from "react";
import './index.less';

export const PaySumItem = (props) => {
  const { date = '8月12日', week = '星期五', dayValue = '230', items = [
    {
      info: "晚餐",
      value: "23.3",
      class: "dinner"
    },
  ] } = props;
  return (
    <>
      {
        items.map((item, index) => {
          return (
            <View key={index} className='container flex column-center'>
              <View className='icon'>
                <Text className='icon iconfont icon-tongxun'></Text>
              </View>
              <View className='item-right flex flex-1 just-between '>
                <View className='left flex-1'>
                  <Text className='info'>
                    {item.info}
                  </Text>
                  <View></View>
                </View>
                <View className='right'>
                  <View className='value'>
                    {item.value}
                  </View>
                  <View className='sum'>
                    6 笔
                  </View>
                </View>
              </View>

            </View>
          )
        })
      }

    </>
  )
}