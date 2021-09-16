import { View, Text, Input, Picker } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useEffect, useReducer, useState } from "react";
import { dateFormat } from "../../utils";
import './index.less';
import { reducer } from "./reducer";

const inputs = [
  ['7', '8', '9', 'DATE'],
  ['4', '5', '6', '+'],
  ['1', '2', '3', '-'],
  ['.', '0', 'x', '=']
]

const initDate = dateFormat(new Date(), 'YYYY/mm/dd');

export const BOARD_HEIGHT = '35vh';

const Board = (props) => {
  const { clickHandle, value } = props;
  return (
    <View onClick={() => clickHandle({ value })} className='board flex row-center column-center'>
      {
        value === 'x' ? <Text className='undo icon iconfont icon-chehui'></Text> : value
      }
    </View>
  )
}

const FinishBoard = (props) => {
  const { clickHandle, value } = props;
  return (
    <View onClick={() => clickHandle()} className='board finish flex row-center column-center '>
      {value}
    </View>
  )
}

const DateBoard = (props) => {
  const { clickHandle, date } = props;
  return (
    <View className='board flex row-center column-center'>
      <Picker fields='day' mode='date' value={date} onChange={(e) => clickHandle(dateFormat(new Date(e.detail.value), 'YYYY/mm/dd'))}>
        <View className='flex column-center date'>
          {initDate === date ? '今天' : date}
        </View>
      </Picker>
    </View>
  )
}

export const KeyBoard = (props) => {
  const { confirmPay } = props;

  const [input, setInput] = useState<{ value: string }>({ value: '0' });

  const [boardStatus, setBoardStatus] = useState(false);
  const [tip, setTip] = useState('');

  const [{ value }, dispatch] = useReducer(reducer, { value: '0' })

  const [date, setDate] = useState(initDate);

  useEffect(() => {
    if (value.includes('+') || value.includes('-')) {
      setBoardStatus(true);
    } else {
      setBoardStatus(false);
    }
  }, [value])

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

  const finishInput = () => {
    if (boardStatus) {
      dispatch({ type: 'finish' });
      return;
    };
    confirmPay({
      value,
      date,
      tip
    })
  }

  const onInpushChange = (e) => {
    setTip(e.detail.value)
  }

  const onBoardClickHandle = (data) => {
    Taro.vibrateShort();
    setInput(data);
  }

  return (
    <View className='board-container flex-column just-between' style={{ height: BOARD_HEIGHT }}>
      <View className='top flex border-box column-center'>
        <Text className='tip icon iconfont icon-beizhu'></Text>
        <Input onInput={onInpushChange} type='text' className='input' placeholder='备注一下' maxlength={10} />
        <View className='value'>{value}</View>
      </View>
      <View className='main flex-1'>
        {
          inputs.map((list, index) => {
            return <View className='board-line flex ' key={index}>
              {
                list.map(number => {
                  return number === 'DATE'
                    ? <DateBoard clickHandle={setDate} date={date} />
                    : number === '='
                      ? <FinishBoard clickHandle={finishInput} value={boardStatus ? '=' : '完成'} />
                      : <Board clickHandle={onBoardClickHandle} value={number} />
                })
              }
            </View>
          })
        }
      </View>
    </View>
  )
}