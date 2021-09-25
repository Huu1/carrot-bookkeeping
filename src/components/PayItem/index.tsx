import { View, Text } from "@tarojs/components";
import React from "react";
import { weekMap } from "../../utils/json";
import Money from "../Money";
import { SwipeAction } from "../SwipeAction";
import './index.less';

const PayItem = (props) => {
  const { data, delCallback } = props;
  const { date, list } = data;

  const week = weekMap[new Date(date).getDay()] || '';
  
  const all = list.reduce((pre, cur) => pre += (+cur.value), 0).toFixed(2);

  const onCallback = (id) => {
    delCallback(id, date);
  }

  return (
    <View className='container'>
      <View className='top-info border-box flex'>
        <Text className='icon iconfont icon-huluobu'></Text>
        <View className='time'>{date}</View>
        <View className='week'>{week}</View>
        <View className='value'>
          <Text >支出：</Text>
          <Text className='number' >{all}</Text>
        </View>
      </View>
      {
        list.map((item, index) => {
          return (
            <SwipeAction key={item.id} id={item.id} onCallback={onCallback} >
              <View className='item border-box flex column-center'>
                <View className='icon'>
                  <Text className={`icon iconfont icon-${item.category.icon}`}></Text>
                </View>
                <View className='item-right border-box flex flex-1 just-between '>
                  <View className='info'>
                    {item.category.title}
                  </View>
                  <View className='value'>
                    <Money value={item.value} />
                  </View>
                </View>
              </View>
            </SwipeAction>
          )
        })
      }
    </View>
  )
}

export default React.memo(PayItem);