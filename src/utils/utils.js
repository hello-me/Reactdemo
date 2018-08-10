/**
 * Created by licong on 2018/8/7.
 */
 import React from 'react';
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
   }
 }