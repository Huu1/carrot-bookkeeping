import { Text } from "@tarojs/components";
import React from "react";
// import './index.less';

export const Icon = React.memo((props: { icon: string, style?: object } = { icon: 'luobo', style: {} }) => {
  return (
    <Text className={`icon iconfont icon-${props.icon}`} style={props.style}></Text>
  )
})