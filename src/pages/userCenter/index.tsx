import React from 'react';
import Taro from "@tarojs/taro";
import { View, Image, Text, Button } from '@tarojs/components'
import './index.less'

const defaultAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

const UserCenter = () => {
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
          <View className='number'>0.00</View>
          <Text className='text'>共支出(元)</Text>
        </View>
        <View className='menu-item'>
          <View className='number'>23</View>
          <Text className='text'>记账总天数</Text>
        </View>
        <View className='menu-item'>
          <View className='number'>45</View>
          <Text className='text'>记账总笔数</Text>
        </View>
      </View>
      <View className='action-aera menu flex just-between'>
        <View className='menu-item'>
          <Text className='icon iconfont icon-fenlei-'></Text>
          <View className='text'>设置类别</View>
        </View>
        <View className='menu-item'>
          <Text className='icon iconfont icon-guanyu1'></Text>
          <View className='text'>提个建议</View>
        </View>
        <View className='menu-item'>
          <Text className='icon iconfont icon-wushuju'></Text>
          <View className='text'>更新小程序</View>
        </View>
        <View className='menu-item'>
          <Text className='icon iconfont icon-guanyu1'></Text>
          <View className='text'>关于我们</View>
        </View>
      </View>
      <View className='share flex-column row-center column-center'>
        <Button size='default' style={{width:'100%',marginBottom:'5px'}} type='warn'>推荐给好友~</Button>
        <Text>V1.0</Text>
      </View>
    </View>
  )
}

export default UserCenter;
