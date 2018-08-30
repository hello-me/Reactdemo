/**
 * Created by licong on 2018/8/30.
 */
 import {createStore, applyMiddleware} from 'redux';
 // 引入所有的reducer,创建数据源
 import reducer from './../reducer';
 const initialState = {
 menuName: ''
 }
 const Store = () => createStore(reducer, initialState);
 export default Store;