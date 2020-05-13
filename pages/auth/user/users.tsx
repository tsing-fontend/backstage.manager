import React from 'react';
import { Table, Button, Switch, Divider, Dropdown, Menu, Tag } from 'antd';
import { PlusCircleOutlined, DownOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';
import moment from 'moment';
import { getUsers } from '../../api/user';
import { UserPoJo } from '../../../interface/user';

interface IState {
    users: object[],
    pagination: object,
}

export default class Users extends React.Component<IState> {

    readonly state = {
        users: [],
        pagination: {},
    };

    componentWillMount() {
        this.loadList();
    };

    private current: number | undefined = undefined;
    private size: number | undefined = undefined;

    private loadList = async () => {

        let current: number = this.current === undefined ? 1 : this.current;
        let size: number = this.size === undefined ? 5 : this.size;

        let url = `/users?current=${current}&size=${size}`;

        const res = await getUsers(url);
        let data: UserPoJo[] = res.records;
        const pagination = {
            showSizeChanger: true,
            total: res.total,
            pageSize: res.size,
            showTotal: ((total) => {
                return `共 ${total} 条`;
            }),
        };
        this.setState({
            users: data,
            pagination: pagination,
            tableLoading: false
        });

    };

    menu = (
        <Menu>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                重置密码
            </a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
               分配角色
            </a>
          </Menu.Item>
        </Menu>
    );

    columns: ColumnProps<UserPoJo>[] = [
        {
            "align": "center",
            "title": "用户ID",
            "dataIndex": "id",
            "key": "id"
        },
        {
            "align": "center",
            "title": "登陆名称",
            "dataIndex": "nickName",
            "key": "nickName"
        },
        {
            "align": "center",
            "title": "用户名",
            "dataIndex": "name",
            "key": "name"
        },
        {
            "align": "center",
            "title": "部门",
            "dataIndex": "department",
            "key": "department"
        },
        {
            "align": "center",
            "title": "邮箱",
            "dataIndex": "email",
            "key": "email"
        },
        {
            "align": "center",
            "title": "手机号",
            "dataIndex": "phone",
            "key": "phone"
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
                    <Button type="link">
                        删除
                    </Button>
                    <Button
                        type="link"
                        onClick={ (item) => { this.handleOpenUpdate(record) }} >
                        修改
                    </Button>
                    {/* <Dropdown overlay={this.menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        更多操作 <DownOutlined />
                        </a>
                    </Dropdown> */}
                </span>
            ),
        }
    ];

    private handleSearcher = (values) => {
        // this.loadList(values);
    };

    private handleOpenUpdate = (record) => {
    };

    private handleOpenCreate = () => {
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
                <Table<UserPoJo>
                    rowKey="id"
                    columns={this.columns}
                    dataSource={this.state.users}
                    pagination={this.state.pagination} />
            </div>
        )
    }
}