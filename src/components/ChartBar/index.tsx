import { View, Text, Picker } from "@tarojs/components";
import React, { useState } from "react";
import { dateFormat } from "../../utils";
import { CButton } from "../Button";
import Money from "../Money";
import './index.less';

const modeList = ['月', '年'];

const pickerStyle = {
  paddingTop: '1px'
}

const getDateFmt = (value) => {
  return value === '0' ? 'YYYY-mm' : 'YYYY';
}

const ChartBar = (props) => {
  const { style, param, onParamChange, sum } = props;
  const { date, mode } = param;

  const modeOnChange = (e) => {
    const { detail: { value } } = e;
    onParamChange({
      mode: value,
      date: dateFormat(new Date(), getDateFmt(value))
    })
  }

  const dateOnChange = (e) => {
    const { detail: { value } } = e;
    onParamChange({
      ...param,
      date: dateFormat(new Date(value), getDateFmt(mode))
    })
  }

  return (
    <View style={{ ...style }} className='bar-container flex  column-center just-between'>
      <View className='action flex row-center column-center'>
        {/* <Text className='triangle icon iconfont icon-filterguolv'></Text> */}
        <View >合计支出：</View>
        <Money value={sum} />
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

export default React.memo(ChartBar);