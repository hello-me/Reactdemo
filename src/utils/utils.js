/**
 * Created by licong on 2018/8/7.
 */
 import React from 'react';
 import {Select} from 'antd'
 const Option = Select.Option
 export default {
   formateDate(time) {
   if (time) {
    let date = new Date()
    date.setTime(time)
    let _month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    let _date = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    let _hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    let _minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    let _second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
    let dateStr = `${date.getFullYear()} - ${_month}-${_date} ${_hour}:${_minute}:${_second}`
    return dateStr
   }  else {
   return ''
   }
   },
   pagination(data, callback) {
   return {
   onChange: (current) => {
   callback(current)
   },
   current: data.result.page,
   pageSize:data.result.page_size,
   total: data.result.total_count,
   showTotal: () => {
   return `共${data.result.total_count}条`
   },
   showQuickJumper: true
   }
   },
   getOptionList(data) {
   if(!data) {
   return [];
   }
   let options = []
   data.map((item) => {
   options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
   })
   return options;
   },
   updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
   if (selectedIds) {
   this.setState({
   selectedRowKeys,
   selectedIds: selectedIds,
   selectedItem: selectedRows
   })
   } else {
   this.setState({
       selectedRowKeys,
       selectedItem: selectedRows
       })
     }
   }
 }