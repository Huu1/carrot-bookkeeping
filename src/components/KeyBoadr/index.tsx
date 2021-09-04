import { View, Text, Input } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useEffect, useReducer, useRef, useState } from "react";
import './index.less';
import { reducer } from "./reducer";

const inputs = [
  ['7', '8', '9', 'DATE'],
  ['4', '5', '6', '+'],
  ['1', '2', '3', '-'],
  ['.', '0', 'x', '=']
]

export const BOARD_HEIGHT = '30vh';

const Board = (props) => {
  const { clickHandle, value } = props;
  return <View onClick={() => clickHandle({ value })} className='board flex row-center column-center'>
    {value}
  </View>
}

export const KeyBoard = (props) => {

  const [input, setInput] = useState<{ value: string }>({ value: '0' });

  const [{ value }, dispatch] = useReducer(reducer, { value: '0' })

  useEffect(() => {
    switch (input.value) {
      case '+':
        dispatch({ type: 'add' });
        break;
      case '-':
        dispatch({ type: 'mins' });
        break;
      case '.':
        dispatch({ type: 'dot' });
        break;
      case 'x':
        dispatch({ type: 'back' });
        break;
      default:
        dispatch({ type: 'input', payload: input.value });
        break;
    }
  }, [input])

  return (
    <View className='container flex-column just-between' style={{ height: BOARD_HEIGHT }}>
      <View className='top flex border-box'>
        <Text>备注：</Text>
        <Input type='text' placeholder='请输入' maxlength={10} />
        <View className='value'>{value}</View>
      </View>
      <View className='main flex-1'>
        {
          inputs.map((list, index) => {
            return <View className='board-line flex ' key={index}>
              {
                list.map(number => {
                  return <Board clickHandle={setInput} key={number} value={number} />
                })
              }
            </View>
          })
        }
        {/* <View className='confirm-aera'></View> */}
      </View>
    </View>
  )
}