import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import './index.less'
import { useAppData } from '../../utils/hooks';
import NavBar from '../../components/navBar';
import { classItem } from '../../utils/json';


const itemHandle = () => {
  const result = [];
  const origin = Object.keys(classItem);
  let temp = [];
  origin.forEach((key, index) => {
    temp.push(key);
    if (temp.length === 4) {
      result.push([...temp]);
      temp = [];
    }
  })
  result.push([...temp]);
  temp = null;
  return result;
}

const Charts = () => {
  const { title, navbarHeight } = useAppData();

  // const
  const [classList] = useState(itemHandle());

  return (
    <>
      <NavBar title={title} back />

      <View className='add-page-wrap' style={{ marginTop: navbarHeight + 'px' }}>
        {
          classList.map((line, lIndex) => {
            return (
              <View key={lIndex} className='line-item flex column-cemter just-between'>
                {
                  line.map((key, index) => {
                    return <ClassItem name={key} text={classItem[key]} key={index} />
                  })
                }
              </View>
            )
          })
        }
      </View>
    </>
  )
}

const ClassItem = (props) => {
  const { name, text = '未知' } = props;
  return (
    <View className='class-pay flex-column column-center'>
      <View className='icon-pay flex column-center row-center'>
        <Text
          // eslint-disable-next-line react/jsx-curly-brace-presence
          className={`icon iconfont icon-${name}`}
        ></Text>
      </View>
      <Text>{text}</Text>
    </View>
  )
}


export default Charts;
