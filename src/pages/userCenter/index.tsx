import React, { useState } from 'react';
import Taro, { useReady } from "@tarojs/taro";
import { View, Image, Text, Button } from '@tarojs/components'
import './index.less'

const defaultAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';

const appMenu = [
  [
    { icon: "icon-beizhu", name: "提个建议" },
    { icon: "icon-gengxin", name: "更新小程序" },
    { icon: "icon-fenlei-", name: "设置类别" },
    { icon: "icon-guanyu1", name: "关于我们" },
  ],
  // [
  //   { icon: "icon-guanyu1", name: "关于我们" },
  // ]
]

const UserCenter = () => {
  const [{ allpay, allbookDay, allbookNum }, setUserBookData] = useState({
    allpay: 0,
    allbookDay: 2,
    allbookNum: 2
  });

  return (
    <View className='user-container'>
      <View className='user-info flex'>
        <View className='avatar'>
          <Image src={defaultAvatar} />
        </View>
        <View className='info flex-1 flex-column row-center'>
          <View className='username'>胡瑶</View>
          <Text className='appinfo'>多吃胡萝卜，健康每一天~</Text>
        </View>
      </View>
      <View className='menu flex just-between'>
        <View className='menu-item'>
          <View className='number'>{allpay}</View>
          <Text className='text'>共支出(元)</Text>
        </View>
        <View className='menu-item'>
          <View className='number'>{allbookDay}</View>
          <Text className='text'>记账总天数</Text>
        </View>
        <View className='menu-item'>
          <View className='number'>{allbookNum}</View>
          <Text className='text'>记账总笔数</Text>
        </View>
      </View>
      <View className='action-aera menu '>
        {
          appMenu.map((line, index) => {
            return <View className='menu-line flex just-between' key={index}>
              {
                line.map(({ icon, name }) => {
                  return (
                    <View className='menu-item' key={name}>
                      <Text className={`icon iconfont ${icon}`}></Text>
                      <View className='text'>{name}</View>
                    </View>
                  )
                })
              }
            </View>
          })
        }
        <View className='setting-line'>

        </View>
      </View>
      <View className='share flex-column row-center column-center'>
        <Button size='default' style={{ width: '100%', marginBottom: '5px', height: '40px', lineHeight: '40px' }} type='warn'>推荐给好友~</Button>
        <Text>v1.0</Text>
      </View>
    </View>
  )
}

export default UserCenter;
