import React from 'react';
import App from 'next/app';
import loggerMiddleware from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Layout } from 'antd';
const { Header, Content, Sider } = Layout;
import "antd/dist/antd.css";
import './index.css';

// 自定义组件
import HeaderComponent from '../components/layout/header';
import MenuComponent from '../components/layout/menu';
import FooterComponent from '../components/layout/footer';
import BreadcrumbComponent from '../components/breadcrumb';
import Breadcrumbmenu from '../interface/breadcrumbmenu';
import rootReducer from '../reducers/index';

const store = createStore(rootReducer, {}, applyMiddleware(loggerMiddleware));

interface Props {
    user: any,
}

class MyApp extends App<Props> {

    render() {

        const { Component, pageProps, router } = this.props;
        const { asPath, pathname } = router;
        let isLogin = false;

        if ('/login' === asPath || '/login' === pathname) {
            isLogin = true;
        }

        const breadcrumbmenu = Breadcrumbmenu.getBreadcrumbmenu(pathname);

        return (
            <div>
                <HeaderComponent />
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
                                <Header className="site-layout-background" style={{ padding: 0 }} />
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