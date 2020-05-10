import React, { Component } from 'react';
import {Button} from 'antd'

export default class Index extends Component {
    render() {
        return (
            <div>
                <iframe
                    title="resg"
                    src="http://backstage.tying.info/auth/user/list"
                    style={{ width: '100%', border: '0px', height: '1100px' }}
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    scrolling="auto"
                />
            </div>
        )
    }
}
