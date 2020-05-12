import React from 'react';
import { Breadcrumb } from 'antd';

interface IProps {
    location: string;
}

export default class BreadcrumbComponent extends React.Component<IProps> {
    render() {
        const location = this.props.location;
        const breadcrumb = location.split('/');
        return (
            <div>
                <Breadcrumb style={{
                    paddingLeft:15,
                    paddingTop: 3,
                    marginTop: 13,
                    height: 30,
                    backgroundColor: '#fff'}}>
                   {
                       breadcrumb.map((item, index) => (
                        <Breadcrumb.Item>{item}</Breadcrumb.Item>
                       ))
                   }
                </Breadcrumb>
            </div>
        )
    }
}
