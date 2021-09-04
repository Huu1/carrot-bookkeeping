import { View, Text } from "@tarojs/components";
import React from "react";
import './index.less';

export const PayItem = (props) => {
  const { date = '8月12日', week = '星期五', dayValue = '230', items = [
    {
      info: "晚餐",
      value: "23.3",
      class: "dinner"
    },
    {
      info: "交通",
      value: "2.3",
      class: "traffic"
    },
  ] } = props;
  return (
    <View className='container'>
      <View className='top-info flex'>
        <Text className='icon iconfont icon-huluobu'></Text>
        <View className='time'>{date}</View>
        <View className='week'>{week}</View>
        <View className='value'>
          <Text >支出：</Text>
          <Text className='number' >{dayValue}</Text>
        </View>
      </View>
      {
        items.map((item, index) => {
          return (

            <View key={index} className='item flex column-center'>
              <View className='icon'>
                {/* {item.class} */}

                <Text className='icon iconfont icon-tongxun'></Text>
              </View>
              <View className='item-right flex flex-1 just-between '>
                <View className='info'>
                  {item.info}
                </View>
                <View className='value'>
                  {item.value}
                </View>
              </View>

            </View>
          )
        })
      }

    </View>
  )
}