import { View, Text } from "@tarojs/components";
import React from "react";
import './index.less';

export const ChartBar = (props) => {
  const { style } = props;
  return (
    <View style={{ ...style }} className='bar-container flex  column-center just-between'>
      <View className='filter'>
        <Text className='triangle icon iconfont icon-filterguolv'></Text>
      </View>
      <View className='search'>
        <Text className='triangle icon iconfont icon-sousuo'></Text>
      </View>
    </View>
  )
}