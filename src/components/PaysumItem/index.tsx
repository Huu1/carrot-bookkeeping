import { View, Text } from "@tarojs/components";
import React from "react";
import { Money } from "../Money";
import './index.less';

export const PaySumItem = (props) => {
  const { item = {
    info: "晚餐",
    value: "23.3",
    class: "dinner",
    sum: 4,
    ratio: 0.25
  } } = props;

  const right = (1 - item.ratio) * 100
  return (
    <View className='container flex column-center'>
      <View className='icon'>
        <Text className='icon iconfont icon-tongxun'></Text>
      </View>
      <View className='item-right flex flex-1 just-between '>
        <View className='left flex-1'>
          <Text className='info'>
            {item.info}
          </Text>
          <View className='ratio' style={{ right: `${right}%` }}></View>
        </View>
        <View className='right'>
          <View className='value'>
            <Money value={item.value} />
          </View>
          <View className='sum'>
            {item.sum}笔
          </View>
        </View>
      </View>

    </View>
  )
}