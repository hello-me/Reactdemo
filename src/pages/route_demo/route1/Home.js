/**
 * Created by licong on 2018/8/8.
 */
 import React from 'react'
 import {Link} from 'react-router-dom'
 export default class Home extends React.Component{
  render() {
  return (
  <div>
     <ul>
       <li>
         <Link to="/main">Home1</Link>
       </li>
       <li>
         <Link to="/about">About1</Link>
       </li>
       <li>
        <Link to="/topics">Topics1</Link>
        </li>
      </ul>
    {this.props.children}
  </div>
  )
  }
 }