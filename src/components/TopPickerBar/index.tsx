import { View, Text, Picker } from "@tarojs/components";
import React, { useState } from "react";
import { formatDate, repairZero } from "../../utils";
import "./index.less";

const InitTime = formatDate(new Date());

export const TopPickerBar = (props) => {
  const { style, dateChangeHandle } = props;
  const [date, setDate] = useState<string>(InitTime);

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
              <Text className='triangle'></Text>
            </View>
          </Picker>
        </View>
      </View>
      <View className='row-center flex-column column-center flex-1'>
        <View className='expend'>
          <View className='money-info'>共16笔 合计</View>
          <Text className='money'>500.23</Text>
        </View>
      </View>
    </View>
  )
}