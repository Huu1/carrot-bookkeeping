import { View, Text } from "@tarojs/components";
import React, { Children } from "react";
import './index.less';

export const CButton = (props) => {
  const { style, children } = props;
  return (
    <View className='button' style={style}>
      {children}
    </View>
  )
}