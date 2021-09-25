import { View, Text } from "@tarojs/components";
import React, { useEffect, useRef } from "react";
import { throttle } from "../../utils";
import './index.less';

export const SwipeAction = (props) => {
  const { onCallback, id } = props;
  const ref = useRef(null);

  useEffect(() => {
    let refs = ref.current;
    let start = 0;
    const touchstart = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const { clientX } = e.touches[0];
      start = clientX
    }
    const _move = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const { clientX } = e.touches[0];
      let moveLength = clientX - start;
      if (moveLength < -50) {
        refs.style.transform = `translateX(-120rpx)`;
      } else if (moveLength > 50) {
        refs.style.transform = `translateX(0)`
      }
    }
    const up = (e) => {
      start = 0;
    }
    // const move = throttle(_move, 10)
    const move = _move;
    refs.addEventListener('touchstart', touchstart);
    refs.addEventListener('touchmove', move);
    refs.addEventListener('toucheup', up);
    return () => {
      refs.removeEventListener('touchstart', touchstart);
      refs.removeEventListener('touchmove', move);
      refs.removeEventListener('toucheup', up);
    }
  }, [])

  const onClickHandle = () => {
    onCallback(id);
  }

  return (
    <View className='swipe-wrap' >
      <View className='swipe-container' ref={ref}>
        <View className='content'>
          {props.children}
        </View>
        <View  className='action-aera flex row-center column-center' onClick={onClickHandle}>
          <Text  className='triangle icon iconfont icon-changyonggoupiaorenshanchu'></Text>
        </View>
      </View>
    </View>

  )
}