import React, { Component } from 'react'
import { Tag, Space, Table, Button } from 'antd';
import { connect } from 'react-redux';
import * as counterActions from '../../actions/counter';
import * as userActions from '../../actions/user';
import { bindActionCreators } from 'redux';
import "antd/dist/antd.less";
import './demo.less';

interface Props {
    counter: number,
    user: any,
    counterActions: any,
    userActions:any,
}

class Index extends React.Component<Props> {

    static async getInitialProps() {
        return {  }
    }

    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    render() {
        return (
            <div>
                <h1>列表数据渲染</h1>
                <Table columns={this.columns} dataSource={this.data} />
                <h1>静态图片渲染</h1>
                <img src='/favicon.ico'/>
                <h1>redux</h1>

                <h1>html页面渲染</h1>
                <div>{this.props.counter} </div>
                {/* <div>{{}} </div> */}
                <button onClick={ () => this.props.counterActions.increment(10) }>增加</button>
                <button onClick={ () => this.props.counterActions.decrement(10)}>减少</button>
                <button onClick={ () => this.props.userActions.saveUser({"usernmae": '测试'})}>设置用户信息</button>
                {/* <iframe
                    title="resg"
                    src="https://baidu.com"
                    style={{ width: '100%', border: '0px', height: '1100px' }}
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    scrolling="auto"
                /> */}

                <h1>测试 less</h1>
                <div className="test">
                    ceshi
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        counter: state.counter,
        user: state.user,
    }
};

const mapDispatchToProps = (despatch) => {
        return {
            counterActions: bindActionCreators(counterActions,despatch),
            userActions: bindActionCreators(userActions,despatch),
        }
};

export default connect(mapStateToProps,mapDispatchToProps)(Index);