import React from 'react';
import { Table, Tag, Button, message } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import {
    MinusCircleTwoTone,
    PlusCircleTwoTone,
    PlusCircleOutlined,
} from '@ant-design/icons';
import moment from 'moment';

// 自己的组件
import { DepartmentPojo } from '../../../interface/department';
import Department from './department';
import { getDeptTree, getDept, updateDept, saveDept, removeDept } from '../../api/auth/department';


interface IProps {
   
};

interface IState {
    loading: boolean,
    visible: boolean,
    deptTree: any,
    departments: any,
    department: object,
    pagination: object,
};
export default class Departments extends React.Component<IProps, IState> {

    readonly state = {
        loading: false,
        visible: false,
        deptTree: [],
        departments: [],
        department: {},
        pagination: {},
    };

    componentDidMount () {
        this.loadDepartments();
    };

    private loadDepartments = async () => {
        
        const deptTree = await getDeptTree(`/depts/tree`);
        let data: DepartmentPojo[] = deptTree;
        console.log(data);
        this.setState({
            departments: data
        });

    };

    columns: ColumnProps<DepartmentPojo>[] = [
        {
            "align": "center",
            "title": "部门名称",
            "dataIndex": "name",
            "key": "name",
            "width": 250,
        },
        {
            "align": "center",
            "title": "部门编号",
            "dataIndex": "id",
            "key": "id",
        },
        {
            "align": "center",
            "title": "排序",
            "dataIndex": "sequence",
            "key": "sequence"
        },
        {
            "align": "center",
            "title": "状态",
            "dataIndex": "status",
            "key": "status",
            render: (text, record) => (
                <Tag color={text ? 'green' : 'red'}>{text ? '正常' : '已禁用'}</Tag>
            ),
        },
        {
            "align": "center",
            "title": "创建时间",
            "dataIndex": "creationTime",
            "key": "creationTime",
            render: (text, record) => (
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
                        onClick={(item) => { this.handleDelete(record.id) }}
                        >
                        删除
                    </Button>
                    <Button
                        type="link"
                        onClick={(item) => { this.handleOpenUpdate(record) }}
                        >
                        修改
                    </Button>
                </span>
            ),
        }
    ];

    private handleOpenUpdate = async (record) => {
        const res = await getDept(`/depts/${record.id}`);
        this.setState({
            visible: true,
            department: res,
            deptTree: this.state.departments,
        })
    };

    private closeForm = (value) => {
        this.setState({
            visible: value,
        });
    };

    private onCreate = async (value) => {
        if (value.id) {
            const id = await updateDept(`/depts/${value.id}`, value);
            if (id) {
                message.success('修改成功', 5);
                this.setState({
                    visible: false,
                });
            };
        } else {
            const id = await saveDept('/depts', value);
            if (id) {
                message.success('添加成功', 5);
                this.setState({
                    visible: false,
                });
            };
        }

    };

    private handleOpenCreate = () => {
        this.setState({
            visible: true,
            deptTree: this.state.deptTree,
            department: {}
        })
    };
    

    private handleDelete = async (value) => {
        const id = await removeDept(`/depts/${value}`);
        if (id) {
            message.success('删除成功', 5);
            this.loadDepartments();
        };
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
                <Table<DepartmentPojo>
                    rowKey="id"
                    rowSelection={{
                        type: 'radio',
                    }}
                    columns={this.columns}
                    dataSource={this.state.departments}
                    pagination={false}
                    indentSize={35}
                    expandable={{
                        expandIcon: ({ expanded, onExpand, record }) =>
                            expanded ? (
                                <MinusCircleTwoTone onClick={e => onExpand(record, e)} />
                            ) : (
                                    <PlusCircleTwoTone onClick={e => onExpand(record, e)} />
                                )
                    }} />
                <Department
                     visible={this.state.visible}
                     deptTree={this.state.deptTree}
                     closeForm={this.closeForm}
                     onCreate={this.onCreate}
                     dept={this.state.department}
                />
            </div>
        )
    }
}
