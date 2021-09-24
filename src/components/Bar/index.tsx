/* eslint-disable @typescript-eslint/no-useless-constructor */
import React, { Component } from 'react'

import { Chart } from "@antv/f2/lib/core"
import '@antv/f2/lib/geom/interval'

import Legend from "@antv/f2/lib/plugin/legend"
import Tooltip from '@antv/f2/lib/plugin/tooltip'

import '@antv/f2/lib/component/guide/text'

import Guide from '@antv/f2/lib/plugin/guide'
import PieLabel from '@antv/f2/lib/plugin/pie-label'

import '@antv/f2/lib/coord/polar'

import '@antv/f2/lib/geom/adjust/stack'

import F2Canvas from '../j-canvas';


export default class PieChart extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
  }
  onInit = (config) => {
    Chart.plugins.register([Legend, Tooltip, Guide, PieLabel]);
    const chart = new Chart({...config});
    
    chart.source(this.props.data);
    chart.coord('polar', {
      transposed: true,
      radius: 1,
      innerRadius: 0.6,
    });
    chart.axis(false);
    chart.legend(false);
    chart.tooltip(false);
    const guide = chart.guide()
      .text({
        position: ['50%', '50%'],
        content: '支出占比',
        style: {
          fontSize: 14
        }
      });
    chart.interval()
      .position('const*value')
      .adjust('stack')
      .color('title', this.props.data.map(i=>i.color.trim()));
    chart.pieLabel({
      sidePadding: 30,
      activeShape: true,
      skipOverlapLabels:true,
      // eslint-disable-next-line @typescript-eslint/no-shadow
      label1: function label1(data: any) {
        return {
          text: '￥' + data.value,
          fill: '#343434',
          fontWeight: 'bold'
        };
      },
      // eslint-disable-next-line @typescript-eslint/no-shadow
      label2: function label2(data: any) {
        return {
          text: data.title,
          fill: '#999'
        };
      },
      onClick: function onClick(ev) {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const data = ev.data;
        if (data) {
          guide.content = data.title + "\n" + data.ratio+'%';
          guide.repaint();
        }
      }
    });
    chart.render();
    return chart
  }

  render() {
    return (
      <F2Canvas
        data={this.props.data}
        onInit={this.onInit.bind(this)} id={null}
      />
    )
  }
}