/**
 * Created by licong on 2018/8/7.
 */
 import React from 'react'
 import {Row, Col} from 'antd'
 import './index.less'
 import Util from '../../utils/utils.js'
 import axios from '../../axios'
 import { connect } from 'react-redux'
 class Header extends React.Component{
 state={
 }
 componentWillMount() {
 this.setState({
 userName: 'xxxxxx'
 })
   setInterval(() => {
   let sysTime = Util.formateDate(new Date().getTime());
   this.setState({
     sysTime
   })
   }, 1000)
   this.getWeatherAPIData()
   console.log(this.props)
 }
 getWeatherAPIData() {
  let city = '北京';
  axios.jsonp({
  url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
  }).then((res) => {
  if (res.status === 'success') {
    let data = res.results[0].weather_data[0];
    this.setState({
     dayPictureUrl:data.dayPictureUrl,
     weather: data.weather
     })
    }
  })
 }
   render() {
     const { menuName, menuType } = this.props;
   return (
     <div className="header">
     <Row className="header-top">
     {
       menuType ?
       <Col span="6" className="logo">
         <img src="/assets/logo-ant.svg" alt=""/>
         <span>Good Time</span>
       </Col> :''
     }
       <Col span={menuType?18: 24}>
        <span>欢迎, {this.state.userName}</span>
       </Col>
     </Row>
       {
       menuType? '' :
       <Row className="breadcrumb">
         <Col>
           {menuName || '首页'}
         </Col>
         <Col span="20" className="weather">
          <span className="date"> {this.state.sysTime}</span>
          <span className="weather-img">
           <img src={this.state.dayPictureUrl} alt=""/>
          </span>
          <span className="weather-detail">
           {this.state.weather}
          </span>
         </Col>
       </Row>
       }
     </div>
   )
   }
 }
const mapStateToProps = state => {
  return {
    menuName: state.menuName
  }
};
export default connect(mapStateToProps)(Header)