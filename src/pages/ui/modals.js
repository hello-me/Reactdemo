/**
 * Created by licong on 2018/8/9.
 */
 import React from 'react'
 import {Card, Button, Modal} from 'antd'
 import './ui.less'
export default class Modals extends React.Component {
  state = {
   showModal: false
  }
  handleOpen = (type) => {
  this.setState({
  [type]: true
    })
  }
   handleConfirm = (type) => {
   Modal[type]({
   title: '确认？',
   content: 'Are you sure?',
   onOK() {
   alert('ok')
   },
   onCancel() {
   alert('Cancel')
   }
   })
   }
  render() {
  return (
  <div>
    <Card title="基础模态框" className="card-wrap">
      <Button type="primary" onClick={() =>this.handleOpen('showModal')}>Open</Button>
    </Card>
    <Card title="信息确认框" className="card-wrap">
      <Button type="primary" onClick={() => this.handleConfirm('confirm')}>Confirm</Button>
      <Button type="primary" onClick={() => this.handleConfirm('info')}>Info</Button>
      <Button type="primary" onClick={() => this.handleConfirm('success')}>Success</Button>
      <Button type="primary" onClick={() => this.handleConfirm('warning')}>Warning</Button>
    </Card>
    <Modal
    title="React"
     visible={this.state.showModal}
     okText="好的"
     cancelText="算了"
     onOk={() => {
       this.setState({
         showModal: false
       })
     }}
     onCancel={()=> {
     this.setState({
       showModal: false
     })
     }}
    >
    <p>It`s good Time</p>
    </Modal>
  </div>
  )
  }
}