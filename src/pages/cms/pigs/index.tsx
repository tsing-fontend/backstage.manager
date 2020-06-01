import React from 'react';
import { Button, Table } from 'antd';
import {
    PlusCircleOutlined,
} from '@ant-design/icons';
import PigPojo from '../../../interface/cms/pig';
import { ColumnProps } from 'antd/lib/table';

export default class Index extends React.Component {



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
        },
        {
            "align": "center",
            "title": "图片",
            "dataIndex": "imageUrl",
            "key": "imageUrl",
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
            "key": "recommend"
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
                        onClick={() => {/* this.handleDelete(record.id) */ }}>
                        删除
                    </Button>
                    <Button
                        type="link"
                        onClick={ (item) => {/* t this.handleOpenUpdate(record) */ }}>
                        修改
                    </Button>
                </span>
            ),
        }
    ];


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
                        // onClick={(e) => this.handleOpenCreate()}
                        >
                        新增
                    </Button>
                </div>
                <Table<PigPojo>
                    rowKey="id"
                    columns={this.columns}
                    dataSource={[]}
                    pagination={false}/>
            </div>
        )
    }
}
