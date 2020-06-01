import React from 'react';
import Head from 'next/head';

export default class FaviconHeaderComponent extends React.Component {
    render() {
        return (
            <Head>
                    <title>后台管理平台</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
        )
    }
}
