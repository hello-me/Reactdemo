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
import FormLogin from './pages/form/login'
import FormRegister from './pages/form/register'
import BasicTable from './pages/table/basicTable'
import HighTable from './pages/table/highTable'
import Rich from './pages/rich'
import City from './pages/city/index'
import Order from './pages/order/index'
import Common from './common'
import OrderDetail from './pages/order/detail'
import User from './pages/user/index'
import BikeMap from './pages/map/bikeMap'
import Bar from './pages/echarts/bar/index'
import Line from './pages/echarts/line/index'
import Pie from './pages/echarts/pie/index'
import PermissionUser from './pages/permission'
 export default class IRouter extends React.Component{
  render() {
  return (
    <HashRouter>
     <App>
       <Switch>
       <Route path="/common" render={() =>   <Common>
         <Route path="/common/order/detail/:orderId" component={OrderDetail}/>
       </Common>
       }
       />
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
            <Route path="/form/login" component={FormLogin} />
            <Route path="/form/reg" component={FormRegister} />
            <Route path="/table/basic" component={BasicTable} />
            <Route path="/table/high" component={HighTable} />
            <Route path='/rich' component={Rich} />
            <Route path="/city" component={City} />
            <Route path="/order" component={Order}/>
            <Route path='/user' component={User} />
            <Route path='/bikeMap' component={BikeMap} />
            <Route path="/charts/bar" component={Bar} />
            <Route path="/charts/line" component={Line} />
            <Route path="/charts/pie" component={Pie} />
            <Route path="/permission" component={PermissionUser} />
            <Redirect to="/home" />{/*默认跳转到home*/}
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