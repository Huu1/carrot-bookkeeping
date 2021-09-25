import Taro, { getCurrentPages } from "@tarojs/taro";
import React, { useState } from 'react';
import { View, Button, Input } from '@tarojs/components'
import http from '../../utils/http';
import './index.less'

const Advise = () => {
  const [value, setValue] = useState('');

  const commit = async () => {
    try {
      const { error_code } = await http('/v1/advise', 'POST', { content: value });
      if (error_code === 0) {
        const pages: any = getCurrentPages()
        const prevPage: any = pages[pages.length - 2]
        prevPage.setData({
          type: 'advise'
        })
        Taro.navigateBack({
          delta: 1
        })
      }
    } catch (error) {
    }
  }

  const onInputChange = ({ detail }) => {
    setValue(detail.value);
  }

  return (
    <View className='budget-container'>
      <Input onInput={onInputChange} value={value} adjust-position={false} className='input' type='text' placeholder='请输入您的建议' focus />
      <Button disabled={!value} className='budget-confirm' plain onClick={commit} >提交</Button>
    </View>
  )
}

export default Advise;
