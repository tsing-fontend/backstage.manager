## insert dependency
```bash
    yarn add redux && yarn add react-redux
```

## 修改 _app.tsx
```bash
    ① 引入相关的依赖
        import { Provider } from 'react-redux';
        import { createStore } from 'redux';
        import rootReducer from '../reducers/index';
        const store = createStore(rootReducer);
    ② 将组件包裹
        <Provider store= {store}>
                <LayoutComponent 
                    Component={Component}
                    pageProps={pageProps}
                    router={router}/>
        </Provider>
    ③ 创建 action-type.ts
        export const INCREMENT = 'INCREMENT';
        export const DECREMENT = 'DECREMENT';
    ④ 创建 reducers.ts
        import { INCREMENT, DECREMENT } from '../action-type/counter';

        const counter  = (state = 0,action) => {
            console.log(action);
            switch (action.type) {
                case INCREMENT:
                    state = state + action.number;
                    return state;
                case DECREMENT:
                    state = state - action.number;
                    return state;
                default:
                    return state;
            }
        }

        export default counter;
    ⑤ 在自己的组件中使用 redux
        import React, { Component } from 'react'
import { Tag, Space, Table, Button } from 'antd';
import { connect } from 'react-redux';
import * as counterActions from '../../actions/counter';
import { bindActionCreators } from 'redux';
import "antd/dist/antd.css";

interface Props {
    counter: number,
    counterActions: any,
}

class Index extends React.Component<Props> {

    static async getInitialProps() {
        return { props: { name: 'dong' } }
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
                <button onClick={ () => this.props.counterActions.increment(10) }>增加</button>
                <button onClick={ () => this.props.counterActions.decrement(10)}>减少</button>
                {/* <iframe
                    title="resg"
                    src="https://baidu.com"
                    style={{ width: '100%', border: '0px', height: '1100px' }}
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    scrolling="auto"
                /> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
};

const mapDispatchToProps = (despatch) => {
        return {
            counterActions: bindActionCreators(counterActions,despatch)
        }
};

export default connect(mapStateToProps,mapDispatchToProps)(Index);
```