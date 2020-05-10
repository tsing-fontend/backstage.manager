import React from 'react';
import App, {Container} from 'next/app';
import LayoutComponent from '../components/layout';
import "antd/dist/antd.css";

export default class MyApp extends App {
    render() {
        const { Component, pageProps ,router} = this.props;
        return ( 
        <LayoutComponent 
            Component={Component}
            pageProps={pageProps}
            router={router}/>
        )
    }
}
