import { View, Text } from "@tarojs/components";
import React from "react";
import './index.less';

export const Error = React.memo(({ error = '出了一点小意外~' }: { error?: string }) => {
  return (
    <View className='error holder-container'>
      <View className='flex-column column-center'>
        <Text style={{ fontSize: '80px' }} className='icon iconfont icon-wushuju'></Text>
        <View style={{ marginTop: '20px' }}>{error}</View>
      </View>
    </View>
  )
})