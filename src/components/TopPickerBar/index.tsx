import Taro from "@tarojs/taro";
import { View, Text, Picker } from "@tarojs/components";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { repairZero } from "../../utils";
import Money from "../Money";
import "./index.less";
import { SwitchTriangle } from "../SwitchTriangle";

const getDate = (date) => {
  if (date) {
    const [year, month] = date.split('-');
    return {
      year,
      month: repairZero(month)
    }
  }
}

const surplusRatio = (data) => {
  if (!data || !data.surplus?.toString() || !data.value?.toString()) return null;
  let result;
  result = ((Math.abs(data.surplus) / data.value) * 100).toFixed(0);
  if (+data.surplus < 0) {
    result = `-${result}`;
  }
  return `${(result)}`;
}

const TopPickerBar = (props) => {
  const { height, dateChangeHandle, date, sum } = props;

  const { budget } = useSelector((state: any) => state.app);

  const [status, setStatus] = useState(true);

  const statusChange = () => {
    setStatus(!status);
  }

  const onDateChange = (e) => {
    dateChangeHandle(e.detail.value);
  }

  const toBugetPage = () => {
    Taro.navigateTo({ url: `/pages/Budget/index?date=${date}` });
  }

  return (
    <View className='bar-wrap flex' style={{ height: height + 'px' }}>
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
        <View className='expend flex-column just-between flex-1'>
          <View className='money-info text-center'>合计支出</View>
          <View className='value text-center'>
            <Money value={sum} lastScale />
          </View>
        </View>
        <View className='expend flex-column just-between flex-1'>
          <View className='money-info flex column-center row-center'>
            <View className='text-center'>月预算剩余</View>
            <Text className='icon iconfont icon-shezhi' onClick={toBugetPage}></Text>
          </View>
          <View className='value flex row-center ' style={{ alignItems: "baseline" }}>
            {
              status ?
                <Money value={budget?.surplus} lastScale />
                :
                <View style={{ marginLeft: "3px" }}> <Text>{surplusRatio(budget)}</Text>%</View>
            }
            <SwitchTriangle style={{ marginLeft: "10rpx", alignSelf: "center", marginTop: '5px' }} status={status} statusChange={statusChange} />
          </View>
        </View>
      </View>
    </View>
  )
}

export default React.memo(TopPickerBar);