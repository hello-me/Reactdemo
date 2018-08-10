/**
 * Created by licong on 2018/8/9.
 */
 import React from 'react'
 import {HashRouter, Route, Switch, Redirect} from 'react-router-dom'
 import App from './App'
 import Admin from './admin'
import Home from './pages/home';
 import Buttons from './pages/ui/buttons'
 import Modals from './pages/ui/modals'
 import Loadings from './pages/ui/loadings'
 import Notices from './pages/ui/notice'
 import Messages from './pages/ui/messages'
 import TabPages from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import CarouselPages from './pages/ui/carousel'
 export default class IRouter extends React.Component{
  render() {
  return (
    <HashRouter>
     <App>
       <Switch>
         <Route path="/" render={() =>
         <Admin>
          <Switch>
            <Route path="/home" component={Home}/>
            <Route path="/ui/buttons" component={Buttons}/>
            <Route path="/ui/modals" component={Modals} />
            <Route path="/ui/loadings" component={Loadings}/>
            <Route path="/ui/notification" component={Notices}/>
            <Route path="/ui/messages" component={Messages}/>
            <Route path="/ui/tabs" component={TabPages}/>
            <Route path="/ui/gallery" component={Gallery} />
            <Route path="/ui/carousel" component={CarouselPages} />
            <Redirect to="/home" />
          </Switch>
         </Admin>
         }>
         </Route>
       </Switch>
     </App>
    </HashRouter>
  )
  }
 }