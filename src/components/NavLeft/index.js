/**
 * Created by licong on 2018/8/7.
 */
import React from 'react'
import MenuConfig from './../../config/menuConfig'
import {Menu, Icon} from 'antd'
import {NavLink} from 'react-router-dom'
import './index.less'
import { connect } from 'react-redux'
import {switchMenu} from './../../redux/action'
const SubMenu = Menu.SubMenu;
 class NavLeft extends React.Component {
  state = {
  currentKey: []
  }
  handleClick = ({item, key}) => {
  if (key == this.state.currentKey) {
  return false;
  }
    const { dispatch } = this.props;
    console.log(item)
    dispatch(switchMenu(item.props.title));

  this.setState({
  currentKey: [key]
  })
  }
componentWillMount() {
const menuTreeNode = this.renderMenu(MenuConfig);
let currentKey = [window.location.hash.replace(/#|\?.*$/g, '')];
this.setState({
  menuTreeNode,
  currentKey
})
}
  //菜单渲染
  renderMenu =(data) => {
  return data.map((item) => {
  if (item.children) {
   return (
   <SubMenu title={item.title} key={item.key}>
     {this.renderMenu(item.children)}
   </SubMenu>
   )
  }
  return <Menu.Item title={item.title} key={item.key}>
    <NavLink to={item.key}>{item.title}</NavLink>
  </Menu.Item>
  })
  }
   homeHandleClick = () => {
     const { dispatch } = this.props;
     dispatch(switchMenu('首页'));
     this.setState({
       currentKey: []
     });
   };
  render() {
    return (
      <div>
        <NavLink to="/home" onClick={this.homeHandleClick}>
      <div className="logo">
       <img src="/assets/logo-ant.svg"/>
       <h1>Good Time</h1>
      </div>
        </NavLink>
      <Menu
      theme="dark"
      onClick={this.handleClick}
      selectedKeys={this.state.currentKey}
      >
        { this.state.menuTreeNode }
      </Menu>
      </div>
    )
  }/**/
}
export default connect()(NavLeft)