import { useCallback, useEffect, useState } from "react";
// import F2 from "@antv/f2/lib/index-all";
import F2 from "@antv/f2";
import F2Canvas from "../ChartCanvas/index";
// import fixF2 from './fix_f2'

const initChart = (config) => {
  // ⚠️ 别忘了这行
  // 为了兼容微信小程序，你需要通过这个命令为F2打补丁
  // fixF2(F2)
  // eslint-disable-next-line import/no-named-as-default-member
  const chart = new F2.Chart(
    Object.assign(config, {
      appendPadding: [10, 15, 10, 15],
      // 预留展示tooltip高度
      padding: [40, "auto", "auto"],
    })
  );

  chart.source([], {
    sales: {
      tickCount: 5
    }
  });
  chart.tooltip();
  chart.interval().position('info*value').color('#ffc300');
  chart.render();

  // const data = [{
  //   name: '股票类',
  //   percent: 83.59,
  //   a: '1'
  // }, {
  //   name: '债券类',
  //   percent: 2.17,
  //   a: '1'
  // }, {
  //   name: '现金类',
  //   percent: 14.24,
  //   a: '1'
  // }];
  
  // const map = {};
  // data.forEach(function(obj) {
  //   map[obj.name] = obj.percent + '%';
  // });
  
  // // const chart = new F2.Chart({
  // //   id: 'container',
  // //   pixelRatio: window.devicePixelRatio,
  // //   padding: [ 20, 'auto' ]
  // // });
  // chart.source(data, {
  //   percent: {
  //     formatter: function formatter(val) {
  //       return val + '%';
  //     }
  //   }
  // });
  // chart.pieLabel({
  //   sidePadding: 40,
  //   // eslint-disable-next-line no-shadow
  //   label1: function label1(data, color) {
  //     return {
  //       text: data.name,
  //       fill: color
  //     };
  //   },
  //   // eslint-disable-next-line no-shadow
  //   label2: function label2(data) {
  //     return {
  //       text: data.percent+'%',
  //       // fill: '#808080',
  //       // fontWeight: 'bold'
  //     };
  //   }
  // });
  // chart.tooltip(false);
  // chart.legend(false);
  // chart.coord('polar', {
  //   transposed: true,
  //   innerRadius: 0.7,
  //   radius: 0.85
  // });
  // chart.axis(false);
  // chart.interval()
  //   .position('a*percent')
  //   .color('name', [ '#FE5D4D', '#3BA4FF', '#737DDE' ])
  //   .adjust('stack');
  // chart.render();


  // 一定要返回chart实例哦
  return chart;
};

export const LineChart = (props) => {
  const { data } = props;
  const [chart, setChat] = useState(null);

  const fn = useCallback(
    (config) => {
      const ch = initChart(config);
      setChat(ch)
    },
    []
  );

  useEffect(() => {
    if (chart) {
      chart.changeData(data);
      chart.render();
    }
  }, [data, chart])

  return (
    <>
      <F2Canvas
        id='chart-id'
        style={{ width: "100%", height: "200px" }}
        onInit={fn}
      />
    </>
  );
};
