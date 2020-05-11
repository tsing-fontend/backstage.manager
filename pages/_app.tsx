import React from 'react';
import App from 'next/app';
import loggerMiddleware from 'redux-logger';
import LayoutComponent from '../components/layout';
import "antd/dist/antd.css";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';


const store = createStore(rootReducer,{},applyMiddleware(loggerMiddleware));

interface Props {
    user: any,
}

class MyApp extends App<Props> {

    render() {
        const { Component, pageProps, router } = this.props;
        const { asPath, pathname } = router;
        let container: any;

        if ('/login' === asPath || '/login' === pathname) {
            container = ( 
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            )
        } else {
            container = (
                <Provider store={store}>
                    <LayoutComponent
                        Component={Component}
                        pageProps={pageProps}
                        router={router} />
                </Provider>
            )
        }
        return (
            container         
        )
    }
}

export default MyApp