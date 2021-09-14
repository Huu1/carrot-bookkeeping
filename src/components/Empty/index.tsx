import { View, Text } from "@tarojs/components";
import React from "react";
import './index.less';

export const Empty = ({info = '空空如也，赶紧记一笔吧'}) => {
  return (
    <View className='empty holder-container'>
      <View className='flex-column column-center'>
        <Text style={{ fontSize: '80px' }} className='icon iconfont icon-wushuju'></Text>
        <View style={{ marginTop: '20px' }}>{info}</View>
      </View>
    </View>
  )
}