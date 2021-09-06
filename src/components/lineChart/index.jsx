import { useCallback, useEffect, useState } from "react";
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
  chart.interval().position('item*value');
  chart.render();


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
      chart.render()
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
