/**
 * Created by licong on 2018/8/23.
 */
 import React from 'react'
 import {Card} from 'antd'
 import ReactEcharts from 'echarts-for-react'
 import echartTheme from '../echartTheme'
 import echarts from 'echarts/lib/echarts'
 import 'echarts/lib/chart/line'
 import 'echarts/lib/component/tooltip'
 import 'echarts/lib/component/title';
 import 'echarts/lib/component/markPoint';
 export default class Line extends React.Component {
 state = {}
 componentWillMount() {
   echarts.registerTheme('React',echartTheme);
 }
 getOption() {
 let option = {
 title: {
  text: '用户骑行订单'
 },
 tooltip: {
 trigger: 'axis'
 },
 xAxis: {
 data: [
   '周一',
   '周二',
   '周三',
   '周四',
   '周五',
   '周六',
   '周日'
 ]
 },
 yAxis: {
 type: 'value'
 },
 series: [
   {
   name: '订单量',
   type: 'line',
   data: [
     1000,
     2000,
     1500,
     3000,
     2000,
     1200,
     800
     ]
   }
 ]
 }
 return option;
 }
 getOption2() {
  let option = {
  title: {
  text:'用户骑行订单'
  },
  tooltip: {
  trigger: 'axis'
  },
  legend: {
  data: ['OFO订单量', '摩拜订单量']
  },
  xAxis: {
  data: [
    '周一',
    '周二',
    '周三',
    '周四',
    '周五',
    '周六',
    '周日'
  ]
  },
  yAxis: {
  type: 'value'
  },
  series: [
    {
    name:'OFO订单量',
    type: 'line',
    stack: '总量',
    data: [
      1200,
      3000,
      4500,
      6000,
      8000,
      12000,
      20000
     ]
    },
    {
      name: '摩拜订单量',
      type: 'line',
      stack: '总量',
      data: [
        1000,
        2000,
        5500,
        6000,
        8000,
        10000,
        12000
      ]
    }
  ]
  }
  return option;
 }
 getOption3() {
  let option = {
  title: {
  text: '用户骑行订单'
  },
  tooltip: {
  trigger: 'axis'
  },
  xAxis: {
  type: 'category',/*类目组，适用于离散的数据*/
    boundaryGap: false,/*控制刻度从0开始。设置Wietrue从中间开始*/
    data: [
      '周一',
      '周二',
      '周三',
      '周四',
      '周五',
      '周六',
      '周日'
    ]
  },
  yAxis: {
  type: 'value'
  },
  series: [
    {
      name: '订单量',
      type: 'line',
      data: [
        1000,
        2000,
        1500,
        3000,
        2000,
        1200,
        800
      ],
      areaStyle: {}/*指定区域填充色*/
    }
  ]
  }
  return option;
 }
 render() {
 return (
 <div>
   <Card title="折线图表之一">
    <ReactEcharts
    option={this.getOption()}
    theme="React"
    notMerge={true}
    lazyUpdate={true}
    style={{
    height: 500
    }}
    />
   </Card>
   <Card title="折线图表之二" style={{marginTop: 10}}>
    <ReactEcharts
    option={this.getOption2()}
    theme="React"
    notMerge={true}
    style={{
    height: 500
    }}
    />
   </Card>
   <Card title="折线图表之三" style={{marginTop:10}}>
   <ReactEcharts
   option={this.getOption3()}
   theme="React"
   notMerge={true}
   style={{
   height: 500
   }}
   />
   </Card>
 </div>
 )
 }
 }