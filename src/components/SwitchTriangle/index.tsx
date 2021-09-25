import { View, Text } from "@tarojs/components";
import React, { useState } from "react";
import { Icon } from "../Icon";
import './index.less';

const rotate = {
  transform: 'rotateX(180deg)'
}

export const SwitchTriangle = React.memo((props: any) => {
  const { status, statusChange } = props;
  return (
    <View className='switch-container' style={props.style} onClick={statusChange}>
      {
        status ?
          <>
            <Text className='icon iconfont  icon-fill-tranangle' ></Text>
            <Text className='icon iconfont  icon-border-triangle' ></Text>
          </>
          :
          <>
            <Text className='icon iconfont  icon-border-triangle' style={rotate}></Text>
            <Text className='icon iconfont  icon-fill-tranangle' style={rotate}></Text>
          </>
      }
    </View>
  )
})