/**
 * Created by licong on 2018/8/10.
 */
 import React from 'react'
 import {Card, Button, message} from 'antd'
 export default class Messages extends React.Component {
   showMessage=(type)=> {
    message[type]('it`s always time')
   }
 render() {
 return (
 <div>
 <Card title="全局提示框" className="card-wrap">
  <Button type="primary" onClick={() => this.showMessage('success')}> Success </Button>
 </Card>
 </div>
 )
 }

 }