import { CoverView } from '@tarojs/components';
import Taro from "@tarojs/taro";
import React, { useEffect } from 'react';
import { useNavInfo } from '../../utils/hooks';


const NavBar = () => {
  const { appHeaderHeight } = useNavInfo();
  const style = {
    height: appHeaderHeight
  }

  useEffect(() => {
    Taro.showNavigationBarLoading();
    setTimeout(() => {
      Taro.hideNavigationBarLoading();
    }, 2000);
  }, [])

  return (
    <CoverView style={style} className='navbar-wrap' >

    </CoverView>
  )
}

export default NavBar;
