import { View, Text, Picker } from "@tarojs/components";
import React, { useState } from "react";
import { dateFormat } from "../../utils";
import { CButton } from "../Button";
import './index.less';

const modeList = ['月', '年'];

const pickerStyle = {
  paddingTop: '1px'
}

export const ChartBar = (props) => {
  const { style } = props;

  const [mode, setMode] = useState('0');
  const [date, setDate] = useState(dateFormat(new Date(), 'YYYY-mm'));

  const modeOnChange = (e) => {
    const { detail: { value } } = e;
    setMode(value);
    const fmt = value === '0' ? 'YYYY-mm' : 'YYYY';
    setDate(dateFormat(new Date(), fmt))
  }

  const dateOnChange = (e) => {
    const { detail: { value } } = e;
    setDate(value)
  }

  return (
    <View style={{ ...style }} className='bar-container flex  column-center just-between'>
      <View className='action'>
        {/* <Text className='triangle icon iconfont icon-filterguolv'></Text> */}
        <Text >支出：200.00</Text>
      </View>
      <View className='date flex'>
        <Picker mode='selector' style={{ marginRight: '10px', ...pickerStyle }} range={modeList} onChange={modeOnChange}>
          <CButton>{modeList[mode]}</CButton>
        </Picker>
        {
          mode === '0'
            ?
            <Picker mode='date' fields='month' style={pickerStyle} value={date} onChange={dateOnChange}>
              <CButton>{date}</CButton>
            </Picker>
            :
            <Picker mode='date' fields='year' style={pickerStyle} value={date} onChange={dateOnChange}>
              <CButton>{date}</CButton>
            </Picker>
        }
      </View>
      {/* <View className='action'>
        <Text className='triangle icon iconfont icon-sousuo'></Text>
      </View> */}
    </View>
  )
}