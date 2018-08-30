import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './router'
import {Provider} from 'react-redux'
import Store from './redux/store/index'
import registerServiceWorker from './registerServiceWorker';
const store = Store()
ReactDOM.render(
<Provider store={store}>
  <Router />
</Provider>,
document.getElementById('root'));
registerServiceWorker();
