import { View, Text } from "@tarojs/components";
import React from "react";
import Money from "../Money";
import './index.less';

export const PaySumItem = React.memo((props: any) => {
  const { item = {
    value: 32434,
    count: 3,
    ratio: 0.25,
    category: {
      title: "饮食",
      icon: "canyin"
    },
  } } = props;



  let right = (1 - item.ratio) * 100;
  right = right > 95 ? 95 : right;
  
  return (
    <View className='container flex column-center'>
      <View className='icon'>
        <Text className={`icon iconfont icon-${item.category.icon}`}></Text>
      </View>
      <View className='item-right flex flex-1 just-between '>
        <View className='left flex-1'>
          <Text className='info'>
            {item.category.title}
          </Text>
          <View className='ratio' style={{ right: `${right}%` }}></View>
        </View>
        <View className='right'>
          <View className='value'>
            <Money value={item.value} />
          </View>
          <View className='sum'>
            {item.count}笔
          </View>
        </View>
      </View>

    </View>
  )
})