/**
 * Created by licong on 2018/8/10.
 */
 import React from 'react'
 import {Card, Button, notification} from 'antd'
 import './ui.less'
 export default class Notices extends React.Component {
 openNotification = (type,direction) => {
  if (direction) {
   notification.config({
     duration: 2,
     placement: direction
   })
  }
  notification[type]({
    message:'it`s good time',
    description: 'xxxxxxxxxxxxxxxxxx'
  })
 }
   render() {
   return (
   <div>
     <Card title="通知提醒框" className="card-warp">
      <Button type="primary" onClick={() => this.openNotification('success', 'topLeft')}>Success</Button>
     </Card>
   </div>
   )
   }
 }