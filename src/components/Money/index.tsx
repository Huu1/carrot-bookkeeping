import { View, Text } from "@tarojs/components";
import React from "react";
import './index.less';

const scaleLastNum = (data: number = 0): any => {
  if (!data) {
    return null;
  }
  let value = Number(data);
  let result = value.toFixed(2);
  const [first = '0.', last = '00'] = result.toString().split('.');
  return {
    first: first + '.',
    last: last.length === 1 ? last + '0' : last
  }
}

const Money = ({ value, lastScale = false, showMins = false }) => {
  const data = scaleLastNum(value);
  return (
    <>
      {
        !data ? '--' :
          <View className={`${lastScale ? 'money' : ''}`}>
            {
              showMins && <Text style={{ display: 'inline-block', marginRight: "3px" }}>-</Text>
            }
            <Text>{data.first}</Text>
            <Text>{data.last}</Text>
          </View>
      }
    </>

  )
}

export default React.memo(Money);