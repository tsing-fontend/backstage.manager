import React from 'react';
import Head from 'next/head';

export default class HeaderComponent extends React.Component {
    render() {
        return (
            <Head>
                    <title>Tsing</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
        )
    }
}
