import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import Taro, { useDidShow, useReady } from "@tarojs/taro";
import { View, Image, Text, Button } from '@tarojs/components'
import './index.less'
import http from '../../utils/http';

const defaultAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';

const appMenu = [
  [
    { icon: "icon-fenlei-", name: "设置类别", page: '' },
    { icon: "icon-guanyu1", name: "设置预算", page: 'Budget' },
    { icon: "icon-beizhu", name: "提个建议", page: 'Advise' },
    { icon: "icon-guanyu1", name: "关于我们", page: '' },
  ],
]

const UserCenter = () => {
  const [{ summary, days, times }, setUserBookData] = useState({
    summary: 0,
    days: 0,
    times: 0
  });

  const dispatch = useDispatch();

  const user = useSelector(((state: any) => state.app.user));

  useReady(() => {
    try {
      const userInfo = Taro.getStorageSync('userInfo');
      if (userInfo) {
        dispatch({
          type: 'app/setUser',
          payload: userInfo
        })
        getUserBook();
      }
    } catch (e) {
      console.log(e);
    }
  });


  useDidShow(() => {
    if (user) {
      getUserBook();
      const pages: any = getCurrentPages();
      const currPageData: any = pages[pages.length - 1].data;
      const type = currPageData.type;
      if (type) {
        currPageData.type=null;
        setTimeout(() => {
          Taro.showToast({
            icon: 'none',
            title: "已收到您的反馈，请关注后续的改进~",
            duration: 1500
          })
        }, 500);
      }
    }else {

    }
  })

  const getUserBook = async () => {
    try {
      Taro.showNavigationBarLoading();
      const { error_code, data } = await http('/v1/expend/summary', 'GET', {})
      if (error_code === 0) {
        setUserBookData({
          summary: data.summary,
          days: data.days,
          times: data.times
        })
      }
      Taro.hideNavigationBarLoading();
    } catch (error) {
      Taro.hideNavigationBarLoading();
    }
  }

  const menuClickHandle = (page) => {
    if (!page) {
      Taro.showToast({
        icon: 'none',
        title: '暂未开放'
      });
      return;
    }
    Taro.navigateTo({ url: `/pages/${page}/index` })
  }


  const login = () => {
    Taro.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        dispatch({
          type: 'app/Login',
          payload: res.userInfo
        })
      }
    })
  }

  return (
    <View className='user-container'>
      {
        user ? <View className='user-info flex'>
          <View className='avatar'>
            <Image src={!user ? defaultAvatar : user.avatarUrl} />
          </View>
          <View className='info flex-1 flex-column row-center'>
            <View className='username'>{user.nickName}</View>
            <Text className='appinfo'>多吃胡萝卜，健康每一天~</Text>
          </View>
        </View>
          :
          <View className='user-info flex' onClick={login}>
            <View className='avatar'>
              <Image src={defaultAvatar} />
            </View>
            <View className='info flex-1 flex-column row-center'>
              立即登录
            </View>
          </View>
      }

      <View className='menu flex just-between'>
        <View className='menu-item'>
          <View className='number'>{summary}</View>
          <Text className='text'>共支出(元)</Text>
        </View>
        <View className='menu-item'>
          <View className='number'>{days}</View>
          <Text className='text'>记账总天数</Text>
        </View>
        <View className='menu-item'>
          <View className='number'>{times}</View>
          <Text className='text'>记账总笔数</Text>
        </View>
      </View>
      <View className='action-aera menu '>
        {
          appMenu.map((line, index) => {
            return <View className='menu-line flex just-between' key={index}>
              {
                line.map(({ icon, name, page }) => {
                  return (
                    <View className='menu-item' key={name} onClick={() => menuClickHandle(page)}>
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
        <Button size='default' style={{ width: '100%', marginBottom: '5px', height: '35px', lineHeight: '35px' }} type='warn'>推荐给朋友~</Button>
        {/* <Text>v1.0</Text> */}
      </View>
    </View>
  )
}

export default UserCenter;
