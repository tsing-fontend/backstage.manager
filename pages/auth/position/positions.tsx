import React from 'react';
import { Table, Tag, Button, message } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import moment from 'moment';
import {
    PlusCircleOutlined,
} from '@ant-design/icons';

// 自定义组件
import { getPositions, updatePosition, savePosition, removePosition } from '../../api/auth/position';
import { PositionPoJo } from '../../../interface/position';
import Position from './position';

interface IProps {
};

interface IState {
    visible: boolean,
    loading: boolean,
    position: object,
    positions: any,
    pagination: object,
    onCreate: any,
};

export default class Positions extends React.Component<IProps, IState> {
 
    readonly state = {
        visible: false,
        loading: false,
        position: {},
        positions: [],
        pagination: {}, 
        onCreate: {}
    };

    private size: number | undefined = undefined;
    private current: number | undefined = undefined;

    
    componentWillMount () {
        this.loadPositions();
    };

    private loadPositions = async () => {

        let current: number = this.current === undefined ? 1 : this.current;
        let size: number = this.size === undefined ? 5 : this.size;
        
        const positions = await getPositions(`/positions?current=${current}&size=${size}`);
        let data: PositionPoJo[] = positions.records;

        const pagination = {
            showSizeChanger: true,
            total: positions.total,
            pageSize: positions.size,
            showTotal: ((total) => {
                return `共 ${total} 条`;
            }),
        };

        this.setState({
            positions: data,
            pagination
        });

    };

    columns: ColumnProps<PositionPoJo>[] = [
        {
            "align": "center",
            "title": "岗位编号",
            "dataIndex": "id",
            "key": "id"
        },
        {
            "align": "center",
            "title": "岗位编码",
            "dataIndex": "positionId",
            "key": "positionId"
        },
        {
            "align": "center",
            "title": "岗位名称",
            "dataIndex": "name",
            "key": "name"
        },
        {
            "align": "center",
            "title": "顺序",
            "dataIndex": "sequence",
            "key": "sequence"
        },
        {
            "align": "center",
            "title": "状态",
            "dataIndex": "status",
            "key": "status",
            render: (text, record) => (
                <span>
                        <Tag color={text ? 'green' : 'red'}>{text ? '正常' : '已禁用'}</Tag>
                </span>
            ),
        },
        {
            "align": "center",
            "title": "创建时间",
            "dataIndex": "creationTime",
            "key": "creationTime",
            render: (text) => (
                <span>{moment((text)).format('YYYY-MM-DD hh:mm:ss')}</span>
            ),
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
                        onClick={() => { this.handleDelete(record.id) }}
                        >
                        删除
                    </Button>
                    <Button
                        type="link"
                        onClick={() => { this.handleOpenUpdate(record) }}
                        >
                        修改
                    </Button>
                </span>
            ),
        }
    ];
    
    private handleOpenUpdate = (vaule) => {
        this.setState({
            visible: true,
            position: vaule,
        });
    };

    private handleCloseForm = (value) => {
        this.setState({
            visible: value,
        });
    };

    private handleOnCreate = async (value) => {
        if (value.id) {
            const id = await updatePosition(`/positions/${value.id}`, value);
            if (id) {
                message.success('修改成功', 5);
                this.setState({
                    visible: false,
                });
            };
        } else {
            const id = await savePosition('/positions', value);
            if (id) {
                message.success('添加成功', 5);
                this.setState({
                    visible: false,
                });
            };
        }
        this.loadPositions();
    };

    private handleOpenCreate = async () => {
        this.setState({
            visible: true,
            position: {},
            onCreate: this.handleOnCreate,
        })
    };

    private handleDelete = async (value) => {
        const id = await removePosition(`/positions/${value}`);
        if (id) {
            message.success('删除成功', 5);
            this.loadPositions();
        } else {
            message.error('删除失败', 5);
        }
    };

    private handleTableChange = (e) => {
        this.size = e.pageSize;
        this.current = e.current;
        this.loadPositions();
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
                <Table<PositionPoJo>
                    rowKey="id"
                    loading = {this.state.loading}
                    columns={this.columns}
                    dataSource={this.state.positions}
                    pagination={this.state.pagination}
                    onChange={(e) => this.handleTableChange(e)}
                    />
                <Position
                    visible={this.state.visible}
                    closeForm= {this.handleCloseForm}
                    onCreate={this.handleOnCreate}
                    position={this.state.position}/>
            </div>
        )
    }
}
