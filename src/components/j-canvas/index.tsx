import React from 'react'
import Taro from '@tarojs/taro'
import { Canvas } from '@tarojs/components'

import { my as F2Context } from '@antv/f2-context'

export interface CanvasProps {
  id: string
  className: string
  style: string
  onInit: any
  data: any[]
}

export interface CanvasState {
  id: string
}

function wrapEvent(e) {
  if (!e) return
  if (!e.preventDefault) {
    e.preventDefault = function () { }
  }
  return e
}


export default class F2Canvas extends React.PureComponent<CanvasProps, CanvasState> {
  // eslint-disable-next-line react/sort-comp
  static INSTANCE_COUNTER = 0;

  // eslint-disable-next-line react/sort-comp
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id || 'f2-canvas-' + F2Canvas.INSTANCE_COUNTER++,
      // eslint-disable-next-line react/no-unused-state
    };
  }

  static defaultProps = {
    className: '',
    style: {
      width: "100%",
      height: '100%'
    },
    onInit: () => { }
  }

  canvasEl: any
  chart: any

  componentWillMount() {
    setTimeout(() => {
      this.onWxCanvas();
    }, 100);
  }

  componentDidUpdate() {
    const { data = [] } = this.props;
    if (this.chart) {
      this.chart.changeData(data);
    }
  }

  // weapp canvas
  onWxCanvas() {
    const query = Taro.createSelectorQuery()

    query.select('#' + this.state.id)
      .fields({
        node: true,
        size: true
      }).exec(res => {

        let { node, width, height } = res[0]

        const context = node.getContext('2d')
        const pixelRatio = Taro.getSystemInfoSync().pixelRatio
        // 高清设置
        node.width = width * pixelRatio
        node.height = height * pixelRatio

        const config = { context, width, height, pixelRatio }
        const chart = this.props.onInit(config);
        if (chart) {
          this.chart = chart
          this.canvasEl = chart.get('el')
        }
      })
  }

  touchStart(e) {
    const canvasEl = this.canvasEl
    if (canvasEl) {
      canvasEl.dispatchEvent('touchstart', wrapEvent(e))
    }
  }
  touchMove(e) {
    const canvasEl = this.canvasEl
    if (canvasEl) {
      canvasEl.dispatchEvent('touchmove', wrapEvent(e))
    }
  }
  touchEnd(e) {
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
        id={this.state.id}
        canvasId={this.state.id}
        onTouchStart={this.touchStart.bind(this)}
        onTouchMove={this.touchMove.bind(this)}
        onTouchEnd={this.touchEnd.bind(this)}
      />
    )
  }
}