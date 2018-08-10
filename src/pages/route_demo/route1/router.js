/**
 * Created by licong on 2018/8/8.
 */
 import React from 'react'
 import {
 HashRouter as Router,
 Route,
 Link,
 Switch} from 'react-router-dom'
 import Main from './Main'
 import About from './about'
 import Topic from './topic'
 import Home from './Home'
 export default class IRouter extends React.Component{
 render() {
 return (
    <Router>
      <Home>
        <Route path="/main" render={()=>
          <Main>
            <Route path="/main/a" component={About}></Route>
          </Main>
        }></Route>
         <Route path="/about" component={About}></Route>
         <Route path="/topics" component={Topic}></Route>
       </Home>
    </Router>
 )
 }
 }