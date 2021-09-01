import { View, Text, Picker } from "@tarojs/components";
import React, { useState } from "react";
import { formatDate, repairZero } from "../../utils";
import "./index.less";

const InitTime = formatDate(new Date());

export const TopPickerBar = () => {

  const [date, setDate] = useState<string>(InitTime);

  const onDateChange = (e) => {
    setDate(e.detail.value)
  }

  const getDate = (data = InitTime) => {
    const [year, month] = data.split('-');
    return {
      year,
      month: repairZero(month)
    }
  }

  return (
    <View className='bar-wrap flex'>
      <View className='flex-column just-between left'>
        <Text className='year'>{getDate(date).year}</Text>
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
      <View className='row-center flex column-center flex-1'>
        <View className='money-info'>共支出 </View>
        <Text className='money'>500.23</Text>
      </View>
    </View>
  )
}