import React from 'react'
import Taro from '@tarojs/taro'
import { Canvas } from '@tarojs/components'
 
/**
|--------------------------------------------------
|  @Drawer
| #Component
| 封装的canvas
|--------------------------------------------------
*/
 
interface Config {
  context: CanvasRenderingContext2D
  width: number
  height: number
  pixelRatio: number
}
 
export type F2CanvasProps = {
  id: string
  className?: string
  style: string
  onInit: (conifg: Config) => any
}
 
function wrapEvent(e: any) {
  if (!e) return
  if (!e.preventDefault) {
    e.preventDefault = function () {}
  }
  return e
}
 
export default class F2Canvas extends React.Component<F2CanvasProps> {
  // eslint-disable-next-line react/sort-comp
  canvasEl: any;
  chart: any;
 
  componentWillMount() {
    setTimeout(() => {
      this.onWxCanvas()
    }, 100)
  }
 
  // weapp canvas
  onWxCanvas() {
    const query = Taro.createSelectorQuery()
 
    query
      .select('#' + this.props.id)
      .fields({
        node: true,
        size: true,
      })
      .exec((res) => {
        const { node, width, height } = res[0]
        const context = node.getContext('2d')
        const pixelRatio = Taro.getSystemInfoSync().pixelRatio
        // 高清设置
        node.width = width * pixelRatio
        node.height = height * pixelRatio
        //  chart全局设置
        const appendPadding = 5
        const config = { context, width, height, pixelRatio, appendPadding }
 
        const chart = this.props.onInit(config)
        if (chart) {
          this.chart = chart
          this.canvasEl = chart.get('el')
        }
      })
  }
 
  touchStart(e: { preventDefault: () => void }) {
    const canvasEl = this.canvasEl
    if (canvasEl) {
      canvasEl.dispatchEvent('touchstart', wrapEvent(e))
    }
  }
 
  touchMove(e: any) {
    const canvasEl = this.canvasEl
    e.stopPropagation()
    e.preventDefault()
    if (canvasEl) {
      canvasEl.dispatchEvent('touchmove', wrapEvent(e))
    }
  }
 
  touchEnd(e: { preventDefault: () => void }) {
    const canvasEl = this.canvasEl
    if (canvasEl) {
      canvasEl.dispatchEvent('touchend', wrapEvent(e))
    }
  }
 
  render() {
    return (
      <Canvas
        className={this.props.className}
        style={this.props.style}
        type='2d'
        id={this.props.id}
        onTouchStart={this.touchStart.bind(this)}
        onTouchMove={this.touchMove.bind(this)}
        onTouchEnd={this.touchEnd.bind(this)}
      />
    )
  }
}