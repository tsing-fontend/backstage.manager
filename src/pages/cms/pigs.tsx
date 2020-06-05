import React from 'react';
import { Button, Table, Tag, message } from 'antd';
import {
    PlusCircleOutlined,
} from '@ant-design/icons';
import PigPojo from '../../interface/cms/pig';
import { ColumnProps } from 'antd/lib/table';
import { getPigs, updatePig, savePig, removePig } from '../api/cms/pig';
import Pig from './pig';
import { runInThisContext } from 'vm';

interface IState {
    visible: boolean,
    pigs: any,
    pig: object,
    pagination: object,
    tableLoading: boolean,
}

export default class Index extends React.Component<IState> {

    readonly state = {
        visible: false,
        pigs: [],
        pig: {},
        pagination: {},
        tableLoading: true,
    };

    componentDidMount () {
        this.loadPigs(1, 10);
    }

    private loadPigs = async ( current: number, size: number ) => {

        let res = await getPigs(`/pigs?current=${current}&size=${size}`);
        let data: PigPojo[] = res.records;

        const pagination = {
            showSizeChanger: true,
            total: res.total,
            pageSize: res.size,
            showTotal: ((total) => {
                return `共 ${total} 条`;
            }),
        };

        this.setState({
            pigs: data,
            pagination: pagination,
            tableLoading: false
        });

    };

    columns: ColumnProps<PigPojo>[] = [
        {
            "align": "center",
            "title": "主键",
            "dataIndex": "id",
            "key": "id",
        },
        {
            "align": "center",
            "title": "名称",
            "dataIndex": "title",
            "key": "title",
        },
        {
            "align": "center",
            "title": "描述",
            "dataIndex": "remark",
            "key": "remark",
            "ellipsis": true,
        },
        {
            "align": "center",
            "title": "图片",
            "dataIndex": "imageUrl",
            "key": "imageUrl",
            render:(record) => {
                return <img src={record}
                            alt=""
                            style={{width:'auto',height:'50px'}}
                        />
            }
        },
        {
            "align": "center",
            "title": "显示顺序",
            "dataIndex": "sequence",
            "key": "sequence",
        },
        {
            "align": "center",
            "title": "是否热销",
            "dataIndex": "recommend",
            "key": "recommend",
            render: (text, record) => {
                let color = '';
                let value = '';
                console.log(text);
                if (text){
                    color = '#108ee9';
                    value = '是';
                } else {
                    color = 'orange';
                    value = '否';
                }
                return (
                    <Tag color={color}>{value}</Tag>
                );
            }
        },
        {
            "align": "center",
            "title": "操作",
            "dataIndex": "",
            "key": "operation",
            "render": (record) => (
                <span>
                    {/* 这个地方修改成别样式 */}
                    <Button
                        type="link"
                        onClick={() => { this.handleDelete(record.id)}}>
                        删除
                    </Button>
                    <Button
                        type="link"
                        onClick={ (item) => { this.handleOpenUpdate(record)  }}>
                        修改
                    </Button>
                </span>
            ),
        }
    ];

    private handleOpenCreate = () => {
        this.setState({
            visible: true,
        });
    };

    private closeForm = () => {
        this.setState({
            visible: false
        });
    };

    private onCreate = async (value) => {
        console.log(value);
        if (value.id) {
            const id = await updatePig(`/pigs/${value.id}`, value);
            if (id) {
                message.success('修改成功', 5);
                this.setState({
                    visible: false,
                });
            };
        } else {
            const id = await savePig('/pigs', value);
            if (id) {
                message.success('添加成功', 5);
                this.setState({
                    visible: false,
                });
            };
        }

        this.loadPigs(1, 10);
    };

    private handleOpenUpdate = (value) => {
        this.setState({
            visible: true,
            pig: value,
        });
    };

    private handleDelete = async (value) => {
        const id = await removePig(`/pigs/${value}`);
        if (id) {
            message.success('删除成功', 5);
        };
        this.loadPigs(1, 10);
    };

    render() {
        return (
            <div>
                <div style={{
                    padding: 10,
                    width: 150,
                }}>
                    <Button
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        onClick={(e) => this.handleOpenCreate()}>
                        新增
                    </Button>
                </div>
                <Table<PigPojo>
                    rowKey="id"
                    bordered={true}
                    columns={this.columns}
                    dataSource={this.state.pigs}
                    pagination={this.state.pagination}/>
                <Pig
                    modelName={'产品维护-技术猪'}
                    pig={this.state.pig}
                    visible={this.state.visible}
                    closeForm={this.closeForm}
                    onCreate={this.onCreate}
                />
            </div>
        )
    }
}
