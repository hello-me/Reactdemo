/**
 * Created by licong on 2018/8/9.
 */
 import React from  'react'
 import {Link} from 'react-router-dom'
 export default class Home extends React.Component {
   render() {
    return (
    <div>
      <ul>
       <li>
         <Link to="/main">Home1</Link>
       </li>
       <li>
         <Link to="/adout">About1</Link>
       </li>
       <li>
         <Link to="/topics">Topics1</Link>
       </li>
       <li>
         <Link to="/imooc1">imooc1</Link>
       </li>
       <li>
         <Link to="/imooc2">imooc2</Link>
       </li>
      </ul>
      <hr/>
      {this.props.children}
    </div>
    )
   }
 }
