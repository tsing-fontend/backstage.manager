import React from 'react';
import App from 'next/app';
import loggerMiddleware from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Layout } from 'antd';
const { Content, Sider } = Layout;

import HeaderComponent from '../components/layout/header';
// persist store
import {persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import "antd/dist/antd.less";
import './index.less';

// 自定义组件
import FaviconHeaderComponent from '../components/layout/faviconheader';
import MenuComponent from '../components/layout/menu';
import FooterComponent from '../components/layout/footer';
import BreadcrumbComponent from '../components/breadcrumb';
import Breadcrumbmenu from '../interface/breadcrumbmenu';
import rootReducer from '../reducers/index';

const myReducer = persistReducer({
    key: 'root',
    storage
}, rootReducer);

const store = createStore(myReducer, {}, applyMiddleware(loggerMiddleware));
const persistor = persistStore(store);

interface Props {
    user: any,
}

class MyApp extends App<Props> {

    render() {

        const { Component, pageProps, router } = this.props;
        const { asPath, pathname } = router;
        console.log(this.props);
        let isLogin = false;

        if ('/login' === asPath || '/login' === pathname) {
            isLogin = true;
        }

        const breadcrumbmenu = Breadcrumbmenu.getBreadcrumbmenu(pathname);

        return (
            <div>
                <FaviconHeaderComponent />
                <Provider store={store}>
                    {
                        isLogin ?
                        <Component {...pageProps} />
                        :
                        <div>
                            <Sider
                                style={{
                                    overflow: 'auto',
                                    height: '100vh',
                                    position: 'fixed',
                                    left: 0,
                                }}>
                                <div className="logo" />
                                <MenuComponent />
                            </Sider>
                            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                                <HeaderComponent/>
                                <BreadcrumbComponent location={ breadcrumbmenu } />
                                <Content style={{ margin: '10px 0px 0', overflow: 'initial' }}>
                                    <div className="site-layout-background" style={{ padding: 0, textAlign: 'center' }}>
                                        <Component {...pageProps} />
                                    </div>
                                </Content>
                                <FooterComponent />
                            </Layout>
                        </div>
                    }
                </Provider>
            </div>

        )
    }
}

export default MyApp