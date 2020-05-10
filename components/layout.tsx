import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import './layout.css';
import { Layout, Menu } from 'antd';
import {
    DashboardOutlined,
    TrademarkCircleOutlined,
    BlockOutlined
} from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
const { Header, Content, Footer, Sider } = Layout;

interface IProps {
    Component: any;
    pageProps: any;
    router: any;
}

export default class LayoutComponent extends React.Component<IProps> {

    render() {
        const { Component, pageProps, router } = this.props;
        return (
            <div>
                <Head>
                    <title>Tsing</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <Layout>
                    <Sider
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                        }}>
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="inline">
                            <SubMenu
                                key='datameta'
                                title={
                                    <span>
                                        <span>仪表盘</span>
                                    </span>
                                }
                                icon={<DashboardOutlined />}>
                                <Menu.Item key='/' title="图表">
                                    <Link href='/'>
                                        <div style={{
                                            width: '100%'
                                        }}>业务数据统计</div>
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key='auth'
                                title={
                                    <span>
                                        <span>权限管理</span>
                                    </span>
                                }
                                icon={<TrademarkCircleOutlined />}>
                                <Menu.Item key='/auth/user/list' title="用户管理">
                                    <Link href='/auth/user/list'>
                                        <div style={{
                                            width: '100%'
                                        }}>用户管理</div>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key='/auth/role/list' title="角色管理">
                                    <Link href='/auth/role/list'>
                                        <div style={{
                                            width: '100%'
                                        }}>角色管理</div>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key='/auth/menu/list' title="菜单管理">
                                    <Link href='/auth/menu/list'>
                                        <div style={{
                                            width: '100%'
                                        }}>菜单管理</div>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key='/auth/department/list' title="部门管理">
                                    <Link href='/auth/department/list'>
                                        <div style={{
                                            width: '100%'
                                        }}>部门管理</div>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key='/auth/position/list' title="职位管理">
                                    <Link href='/auth/position/list'>
                                        <div style={{
                                            width: '100%'
                                        }}>职位管理</div>
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key='produdct'
                                title={
                                    <span>
                                        <span>产品管理</span>
                                    </span>
                                }
                                icon={<BlockOutlined />}>
                                <Menu.Item key='/auth/user/lists' title="图片管理">
                                    <Link href='/auth/user/list'>
                                        <div style={{
                                            width: '100%'
                                        }}>图片管理</div>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key='/auth/role/lists' title="商品管理">
                                    <Link href='/auth/role/list'>
                                        <div style={{
                                            width: '100%'
                                        }}>商品管理</div>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key='/auth/menu/lisst' title="元数据管理">
                                    <Link href='/auth/menu/list'>
                                        <div style={{
                                            width: '100%'
                                        }}>元数据管理</div>
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout" style={{ marginLeft: 200 }}>
                        <Header className="site-layout-background" style={{ padding: 0 }} />
                        <Content style={{ margin: '10px 0px 0', overflow: 'initial' }}>
                            <div className="site-layout-background" style={{ padding: 0, textAlign: 'center' }}>
                                <Component {...pageProps} />
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}> Boc ©2020 Created by Tsing</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
