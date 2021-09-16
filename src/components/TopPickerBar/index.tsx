import { View, Text, Picker } from "@tarojs/components";
import React from "react";
import { repairZero } from "../../utils";
import Money from "../Money";
import "./index.less";

const getDate = (date) => {
  if (date) {
    const [year, month] = date.split('-');
    return {
      year,
      month: repairZero(month)
    }
  }
}

const value2 = 0;

const TopPickerBar = (props) => {
  const { heidght, dateChangeHandle, date, sum } = props;
  // console.log('TopPickerBar render');

  const onDateChange = (e) => {
    dateChangeHandle(e.detail.value);
  }

  return (
    <View className='bar-wrap flex' style={{ height: heidght + 'px' }}>
      <View className='flex-column just-between left'>
        <Text className='year'>{getDate(date)?.year}年</Text>
        <View className='picker-wrap'>
          <Picker fields='month' mode='date' value={date} onChange={onDateChange}>
            <View className='flex column-center'>
              <View className='month'>
                {getDate(date)?.month}
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
          <View className='value'>
            <Money value={sum} lastScale />
          </View>
        </View>
        <View className='expend flex-column just-between'>
          <View className='money-info flex column-center'>
            <View >月预算剩余</View>
            <Text className='icon iconfont icon-shezhi'></Text>
          </View>
          <View className='value'>
            <Money value={value2} lastScale />
          </View>
        </View>
      </View>
    </View>
  )
}

export default React.memo(TopPickerBar);