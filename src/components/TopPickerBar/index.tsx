import { View, Text, Picker } from "@tarojs/components";
import React, { useState } from "react";
import { dateFormat, repairZero } from "../../utils";
import "./index.less";

const InitTime = dateFormat(new Date(), 'YYYY-mm');

const scaleLastNum = (data: number) => {
  let result = data.toFixed(2);
  const [first = '0.', last = '00'] = result.toString().split('.');
  return {
    first: first + '.',
    last
  }
}

export const TopPickerBar = (props) => {
  const { style, dateChangeHandle } = props;
  const [date, setDate] = useState<string>(InitTime);

  const value = 234.23;
  const value2 = 0.23;

  const onDateChange = (e) => {
    setDate(e.detail.value);
    dateChangeHandle(e.detail.value);
  }

  const getDate = (data = InitTime) => {
    const [year, month] = data.split('-');
    return {
      year,
      month: repairZero(month)
    }
  }

  return (
    <View className='bar-wrap flex' style={{ ...style }}>
      <View className='flex-column just-between left'>
        <Text className='year'>{getDate(date).year}年</Text>
        <View className='picker-wrap'>
          <Picker fields='month' mode='date' value={date} onChange={onDateChange}>
            <View className='flex column-center'>
              <View className='month'>
                {getDate(date).month}
                <Text className='month-word'>月</Text>
              </View>
              <Text className='triangle icon iconfont icon-xiasanjiaoxing'></Text>
            </View>
          </Picker>
        </View>
      </View>
      <View className='row-center  flex just-around flex-1'>
        <View className='expend flex-column just-between'>
          <View className='money-info'>合计支出</View>
          <View className='money'>
            <Text>{scaleLastNum(value).first}</Text>
            {scaleLastNum(value).last}
          </View>
        </View>
        <View className='expend flex-column just-between'>
          <View className='money-info'>
            <Text >月预算剩余</Text>
            <Text className='icon iconfont icon-shezhi'></Text>
          </View>
          <View className='money'>
            <Text>{scaleLastNum(value2).first}</Text>
            {scaleLastNum(value2).last}
          </View>
        </View>
      </View>
    </View>
  )
}