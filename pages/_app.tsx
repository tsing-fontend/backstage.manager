import React from 'react';
import App, {Container} from 'next/app';
import LayoutComponent from '../components/layout';
import "antd/dist/antd.css";
import loggerMiddleware from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';

//中间件
const logger = store => next => action => {
    console.log('dispatch->',action);
    let result = next(action); // 加载下一个中间件
    console.log('next state->',store.getState());
    return result;
};

const error = store => next => action => {
    try {
        next(action)
    } catch (error) {
        console.log('error->',error);
    }
};


const store = createStore(rootReducer,{},applyMiddleware(logger,error,loggerMiddleware));

export default class MyApp extends App {

    render() {
        const { Component, pageProps ,router} = this.props;
        return (
            <Provider store= {store}>
                <LayoutComponent 
                    Component={Component}
                    pageProps={pageProps}
                    router={router}/>
            </Provider>               
        )
    }
}
