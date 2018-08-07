/**
 * Created by licong on 2018/8/6.
 */
 import React from 'react'
 import Child from './Child'
 import {Button, Input} from 'antd'
 export default class Life extends React.Component {
 constructor(props) {
 super(props);
 this.state = {
 count: 0
 }
 }
 handleAdd=() => {
 this.setState({
 count: this.state.count + 1
 })
 }
 render() {
 return <div>
 <p>React 生命周期介绍</p>
   <Button type="primary">Ant.......</Button>
 <button onClick={this.handleAdd}>点击一下</button>
 <p>{this.state.count}</p>
 <Child name={this.state.count}></Child>
 </div>
 }
 }