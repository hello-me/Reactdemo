/**
 * Created by licong on 2018/8/22.
 */
 import React from 'react'
 import {Card, Form} from 'antd'
 import axios from '../../axios/index'
 import BaseForm from '../../components/BaseForm'
 export default class BikeMap extends React.Component{
  state = {
  bikeInfo:{}
  }
  map = {}
  formList = [
    {
      type: 'SELECT',
      label: '城市',
      field: 'city',
      placeholder: '全部',
      initialValue: '1',
      width: 80,
      list: [{id: '0', name: '全部'}, {id: '1', name: '北京'}, {id: '2', name: '天津'}, {id: '3', name: '上海'}]
    }, {
    type: '时间查询'
    }, {
    type: 'SELECT',
    label: '订单状态',
    field: 'order_status',
    placeholder: '全部',
    initialValue: '0',
    width: 150,
    list: [{id: '0', name: '全部'}, {id: '1', name: '进行中'}, {id: '3', name: '行程结束'}]
    }
  ]
  params = {
  page: 1
  }
  requestList = () => {
   axios.ajax({
   url: '/map/bike_list',
   data: {
   params: this.params
     }
   }).then((res) => {
    if (res) {
    this.setState({
    total_count: res.result.total_count
    })
    this.renderMap(res.result);
    }
   })
  }
  handleFilterSubmit = (filterParams) => {
  this.params = filterParams;
  this.requestList();
  };
  componentDidMount() {
  this.requestList();
  }
  renderMap = (res) => {
  let list = res.route_list
  this.map = new window.BMap.Map("container");
  let gps1 = list[0].split(',');
  let startPoint = new window.BMap.Point(gps1[0], gps1[1]);
  let gps2 = list[list.length - 1].split(',');
  let endPoint = new window.BMap.Point(gps2[0], gps2[1]);
  this.map.centerAndZoom(endPoint, 11);
  let startPointIcon = new window.BMap.Icon("/assets/start_point.png", new window.BMap.Size(36, 42), {
  imageSize: new window.BMap.Size(36, 42),
  anchor: new window.BMap.Size(18, 42)
  });
  var bikeMarkerStart = new window.BMap.Marker(startPoint, {icon: startPointIcon});
  this.map.addOverlay(bikeMarkerStart);
  let endPointIcon = new window.BMap.Icon("/assets/end_point.png", new window.BMap.Size(36, 42), {
  imageSize: new window.BMap.Size(36, 42),
  anchor: new window.BMap.Size(18, 42)
  });
  var bikeMarkerEnd = new window.BMap.Marker(endPoint, {icon: endPointIcon});
  this.map.addOverlay(bikeMarkerEnd)
  let routeList = [];
  list.forEach((item) => {
  let  p = item.split(',')
  let point = new window.BMap.Point(p[0], p[1]);
  routeList.push(point);
  })
  var polyLine = new window.BMap.Polyline(routeList, {
   strokeColor: "#ef4136",
    strokeWeight: 3,
    strokeOpacity: 1
  });
  this.map.addOverlay(polyLine)
  // 服务区路线
  let serviceList = res.service_list;
  let servicePointlist = [];
  serviceList.forEach((item) => {
  let point = new window.BMap.Point(item.lon, item.lat);
  servicePointlist.push(point);
  })
  // 画线
  var polyServiceLine = new window.BMap.Polyline(servicePointlist, {
  strokeColor: '#ef4136',
  strokeWeight: 3,
  strokeOPacity: 1
  });
  this.map.addOverlay(polyServiceLine);
  //
  let bikeList = res.bike_list;
  let bikeIcon = new window.BMap.Icon("/assets/bike.jpg", new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42)
    })
    bikeList.forEach((item) => {
    let p = item.split(",");
    let point = new window.BMap.Point(p[0], p[1]);
    var bikeMarker = new window.BMap.Marker(point, {icon: bikeIcon});
    this.map.addOverlay(bikeMarker);
    })
    // 添加地图控件
    this.addMapControl();
  };
   addMapControl = () => {
   let map = this.map;
   var top_right_control = new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT});
   var top_right_navigation = new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT});
   // 添加控件和比例尺
     map.addControl(top_right_control);
     map.addControl(top_right_navigation);
     map.enableScrollWheelZoom(true);
   }
  render() {
  return (
  <div>
    <Card>
      <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
    </Card>
    <Card style={{marginTop: 10}}>
     <div>共{this.state.total_count}辆车</div>
     <div id="container" style={{height: 500}}></div>
    </Card>
  </div>
  )
  }
 }