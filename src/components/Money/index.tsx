import { View, Text } from "@tarojs/components";
import React from "react";
import './index.less';

const scaleLastNum = (data: number = 0) => {
  let value = Number(data);
  if (typeof value !== 'number') {
    throw new Error('金额必须为数字');
  }
  let result = value.toFixed(2);
  const [first = '0.', last = '00'] = result.toString().split('.');
  return {
    first: first + '.',
    last: last.length === 1 ? last + '0' : last
  }
}

const Money = ({ value, lastScale = false, showMins = false }) => {
  const { first, last } = scaleLastNum(value);
  return (
    <View className={`${lastScale ? 'money' : ''}`}>
      {
        showMins && <Text style={{display:'inline-block',marginRight:"3px"}}>-</Text>
      }
      <Text>{first}</Text>
      <Text>{last}</Text>
    </View>
  )
}

export default React.memo(Money);