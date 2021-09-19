import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import Taro, { getCurrentPages, useRouter } from "@tarojs/taro";
import { View, Button, Input } from '@tarojs/components'
import './index.less'
import http from '../../utils/http';
import { dateFormat } from '../../utils';

const Budget = () => {
  const { budget } = useSelector((state: any) => state.app);
  const [value, setValue] = useState(budget?.value || '');

  const router = useRouter();
  const { params: { date = dateFormat(new Date(), 'YYYY-mm') } } = router;

  const setBudget = async () => {

    try {
      const { error_code } = await http('/v1/budget/update', 'POST', { value });
      if (error_code === 0) {
        const pages: any = getCurrentPages();
        const prevPage: any = pages[pages.length - 2];
        prevPage.setData({
          newDate: date
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
      <Input onInput={onInputChange} value={value} adjust-position={false} className='input' type='number' placeholder='请输入每月预算' focus />
      <Button className='budget-confirm' plain onClick={setBudget} >确定</Button>
    </View>
  )
}

export default Budget;
