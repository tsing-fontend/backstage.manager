import React from 'react';
import App, {Container} from 'next/app';
import LayoutComponent from '../components/layout';
import "antd/dist/antd.css";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../reducers/index';


const store = createStore(rootReducer);

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
