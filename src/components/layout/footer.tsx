import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

export default class FooterComponent extends React.Component {
    render() {
        return (
            <div>
                <Footer style={{ textAlign: 'center' }}>Boc ©2020 Created by Tsing</Footer>
            </div>
        )
    }
}
