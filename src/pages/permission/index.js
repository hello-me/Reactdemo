/**
 * Created by licong on 2018/8/24.
 */
 import React from 'react'
 import {Card, Button, Form, Input, Select, Tree, Transfer, Modal} from 'antd'
 import axios from '../../axios/index'
 import ETable from '../../components/ETable/index'
 import Utils from '../../utils/utils'
import menuConfig from '../../config/menuConfig'
 const FormItem = Form.Item;
 const Option = Select.Option;
 const TreeNode = Tree.TreeNode;
export default class PermissionUser extends React.Component{
  state={}
  componentWillMount() {
  this.requestList()
  }
 requestList = () => {
 axios.ajax({
 url:'/role/list',
 data: {
  params: {}
 }
 }).then((res) => {
  if (res.code == 0) {
  let list = res.result.item_list.map((item, i) => {
  item.key = i;
  return item;
  })
  this.setState({
  list
  })
  }
 })
 }
 handleRole = () => {
 this.setState({
 isRoleVisible: true
   })
 }
  handlePermission = () => {
  if (!this.state.selectedItem) {
  Modal.info({
  title: '信息',
  content: '请选择一个角色'
  })
    return;
  }
  this.setState({
  isPermVisible: true,
  detailInfo: this.state.selectedItem
  });
  let menuList = this.state.selectedItem.menus;
  this.setState({
  menuInfo: menuList
  })
  }
  handleUserAuth = () => {
  }
  handleRoleSubmit= () => {/**/
  let data = this.roleForm.props.form.getFieldsValue();
  axios.ajax({
  url: 'role/create',
  data: {
  params: {
    ...data
  }
  }
  }).then((res) => {
  if (res) {
  this.setState({
   isRoleVisible:false
  })
  this.requestList()
  }
  })
  }
  handlePermEditSubmit = () => {
   let data = this.roleForm.props.form.getFieldsValue();
   data.role_id = this.state.selectedItem.id;
   data.menus = this.state.menuInfo;
   axios.ajax({
   url: '/permission/edit',
   data: {
   params: {
     ...data
    }
   }
   }).then((res) => {
   if (res) {
   this.setState({
   isPermVisible: false
   })
   this.requestList();
   }
   })
  }
  /*用户授权*/
  handleUserAuth = () => {
  if (!this.state.selectedItem) {
  Modal.info({
  title: '信息',
  content: '未选中任何项目'
  })
    return;
  }
    this.getRoleUserList(this.state.selectedItem.id);
    this.setState({
     isUserVisible: true,
     isAuthClose:false,
     detailInfo: this.state.selectedItem
    });
  }
  getRoleUserList = (id) => {
  axios.ajax({
    url:'/role/user_list',
    data: {
    params: {
    id: id
      }
    }
  }).then((res) => {
  if (res) {
  this.getAuthUserList(res.result)
  }
  })
  }
  getAuthUSerList = (dataSource) => {
  const mockData = [];
  const targetKeys = [];
  if (dataSource && dataSource.length > 0) {
  for (let i = 0; i < dataSource.length; i++) {
  const data = {
  key: dataSource[i].user_id,
  title:dataSource[i].user_name,
  status:dataSource[i].status,
  };
  if (data.status == 1) {
  targetKeys.push(data.key);
    }
  mockData.push(data);
    }
  }
  this.setState({mockData, targetKeys});
  };
  patchUserInfo = (targetKeys) => {
  this.setState({
   targetKeys: targetKeys
  })
  }
  handleUserSubmit = () => {
  let data = {};
  data.user_ids = this.state.targetKeys || [];
  data.role_id = this.state.selectedItem.id;
  axios.ajax({
    url:'/role/user_role_edit',
    data:{
    params: {
      ...data
      }
    }
  }).then((res) => {
  if (res) {
  this.setState({
  isUserState: false
  })
  this.requestList();
    }
  })
  }
  render() {
    const columns = [
      {
        title: '角色ID',
        dataIndex: 'id'
      }, {
        title: '角色名称',
        dataIndex: 'role_name'
      },{
        title: '创建时间',
        dataIndex: 'create_time',
        render: Utils.formatTime
      }, {
        title: '使用状态',
        dataIndex: 'status',
        render(status){
          if (status == 1) {
            return "启用"
          } else {
            return "停用"
          }
        }
      }, {
        title: '授权时间',
        dataIndex: 'authorize_time',
        render: Utils.formatTime
      }, {
        title: '授权人',
        dataIndex: 'authorize_user_name',
      }
    ];
  return(
  <div>
  <Card>
   <Button type="primary" onClick={this.handleRole}>创建角色</Button>
   <Button type="primary" onClick={this.handlePermission}> 设置权限</Button>
   <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
  </Card>
   <div className="content-wrap">
    <ETable
    updateSelectedItem={Utils.updateSelectedItem.bind(this)}
    selectedRowKeys={this.state.selectedRowKeys}
    dataSource={this.state.list}
    columns={columns}
    />
   </div>
   <Modal
   title="创建角色"
   visible={this.state.isRoleVisible}
   onOk={this.handleRoleSubmit}
   onCancel={() => {
   this.roleForm.props.form.resetFields()
   }}
   >
    <RoleForm wrappedComponentRef={(inst) => this.roleForm = inst}/>
   </Modal>
   <Modal
   title="权限设置"
   visible={this.state.isPermVisible}
   width={600}
   onOk={this.handlePermEditSubmit}
   onCancel={() => {
   this.setState({
    isPermVisible: false
     })
   }}>
   <PermEditForm
   wrappeesComponentRef={(inst) => this.roleForm = inst}
   detailInfo={this.state.detailInfo}
   menuInfo={this.state.menuInfo || []}
   patchMenuInfo={(checkedKeys) => {
   this.setState({
   menyInfo: checkedKeys
   });
   }}
   />
   </Modal>
   <Modal
   title="用户授权"
   visible={this.state.isUserVisible}
   onOk={this.handleUserSubmit}
   onCancel={()=>{
     this.setState({
       isUserVisible:false
     })
   }}>
   <RoleAuthForm
   wrappedComponentRef={(inst) => this.userAuthForm = inst}
   isClosed = {this.state.isAuthClosed}
   detailInfo={this.state.detailInfo}
   targetKeys={this.state.targetKeys}
   mockData = {this.state.mockData}
   patchUserInfo={this.patchUserInfo}/**/
   />
   </Modal>
  </div>
  )
  }
 }
 class RoleForm extends React.Component {
 render() {
  const {getFieldDecorator} = this.props.form;
  const formItemLayout = {
  labelCol: {span: 5},
  wrapperCol: {span: 16}
  }
  return (
  <Form layout="horizontal">
    <FormItem label="角色名称" {...formItemLayout}>
      {
      getFieldDecorator('role_name', {
      initialValue: ''
      })(
       <Input type="text" placeholder="请输入角色名称"/>
      )
      }
    </FormItem>
    <FormItem label="状态" {...formItemLayout}>
      {
      getFieldDecorator('state', {
      initialValue:1
      })(
      <Select>
       <Option value={1}>开启</Option>
        <Option value={1}>关闭</Option>
      </Select>
      )
      }
    </FormItem>
  </Form>
  )
 }
 }
 RoleForm = Form.create({})(RoleForm);/*14-5*/
 class PermEditForm extends React.Component {
  state = {};
  onCheck = (checkedKeys) => {
  this.props.patchMenuInfo(checkedKeys);
  };
  renderTreeNodes = (data, key= '') => {
  return data.map((item) => {
  let parentKey = key + item.key;
  if (item.children) {
  return(
  <TreeNode title={item.title} key= {parentKey} dataRef={item} className="op-role-tree">
    {this.renderTreeNodes(item.children, parentKey)}
  </TreeNode>
  );
  } else if (item.btnList) {
  return (
  <TreeNode title={item.title} key={parentKey} dataREf={item} className="op-role-tree">
    {this.renderBtnTreeNode(item, parentKey)}
  </TreeNode>
   );
  }
  return <TreeNode {...item}/>
     });
  };
  renderBtnTreeNode = (menu, parentKey='') => {
  const btnTreeNode = []
  menu.btnList.forEach((item)=> {
   btnTreeNode.push(<TreeNode title={item.title} key={parentKey + 'btn' +item.key} className="op-role-tree"/>)
  })
  return btnTreeNode;
  }
  render() {
  const {getFieldDecorator} = this.props.form;
  const formItemLayout = {
  labelCol: {span: 5},
  wrapperCol: {span: 18}
  };
  const detail_info = this.props.detailInfo;
  const menuInfo = this.props.menuInfo;
  return (
  <Form layout="horizontal">
   <FormItem label="角色名称:" {...formItemLayout}>
     <Input disabled maxLength="8" placeholder={detail_info.role_name}/>
   </FormItem>
   <FormItem label="状态：" {...formItemLayout}>
     {getFieldDecorator('status', {
     initialValue: '1'
     })(
     <Select style={{width: 80}}
     placeholder="启用"
     >
      <Option value="1">启用</Option>
      <Option value="0">停用</Option>
     </Select>
     )}
   </FormItem>
   <Tree
   checkable
   defaultExpandAll
   onCheck={(checkedKeys) => this.onCheck(checkedKeys)}
   checkedKeys={menuInfo || []}
   >
    <TreeNode title="平台权限" key="plarform_all">
      menuConfig      {this.renderTreeNodes(menuConfig)}
    </TreeNode>
   </Tree>
  </Form>
  )
  }
 }
 PermEditForm = Form.create({})(PermEditForm);

 class RoleAuthForm extends React.Component {
  filterOption = (inputValue, option) => {
  return option.title.indexOf(inputValue)
  };
  handleChange = (targetKeys) => {
  this.props.patchUserInfo(targetKeys);
  };
  render() {
  const formItemLayout = {
  labelCol: {span: 5},
  wrapperCol: {span: 18}
  };
  const detail_info = this.props.detailInfo;
  return (
  <Form layout="horizontal">
   <FormItem label="角色名称: " {...formItemLayout}>
    <Input disabled maxLength={8} placeholder={detail_info.role_name}/>
   </FormItem>
   <FormItem label="选择用户" {...formItemLayout}>
   <Transfer
   listStyle={{width:200, height:400}}
   dataSource={this.props.mockData}
   showSearch
   titles = {['待选用户', '已选用户']}
   searchPlaceholder="输入用户名"
   filterOption={this.filterOption}
   targetKeys={this.props.targetKeys}
   onChange={this.handleChange}
   render={item => item.title}
   />
   </FormItem>
  </Form>
  )
  }
 }
