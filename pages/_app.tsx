import React from 'react';
import App from 'next/app';
import loggerMiddleware from 'redux-logger';
import HeaderComponent from '../components/layout/header';
import MenuComponent from '../components/layout/menu';
import FooterComponent from '../components/layout/footer';
import "antd/dist/antd.css";
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import { Layout } from 'antd';
const { Header, Content, Sider } = Layout;


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
        return (
            <div>
                <HeaderComponent />
                <Provider store={store}>
                    {isLogin ?
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