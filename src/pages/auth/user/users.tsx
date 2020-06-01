import React from 'react';
import { Table, Button, Switch, Divider, Dropdown, Menu, Tag, message } from 'antd';
import { PlusCircleOutlined, DownOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';
import moment from 'moment';
import { getUsers, updateUser, removeUser } from '../../api/auth/user';
import { UserPoJo } from '../../../interface/user';
import User from './user';
import { getMenu } from '../../api/auth/menu';
import { saveUser } from '../../api/auth/user';

interface IState {
    visible: boolean,
    users: object[],
    user: object,
    pagination: object,
    menuTreeData: any,
}

export default class Users extends React.Component<IState> {

    readonly state = {
        visible: false,
        user: {},
        users: [],
        pagination: {},
        menuTreeData: [],
    };

    componentWillMount() {
        this.loadList();
        this.loadMenus();
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

    private loadMenus = async () => {
       
        const menuTreeData = [];
        const  { records } = await getMenu(`/menus?current=1&size=100`);

        records.forEach(item => {
                const menu =
                {
                    title: item.name,
                    value: item.id,
                    key: item.id,
                };
                menuTreeData.push(menu);
        });

        this.setState({
            menuTreeData: menuTreeData
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
                    <Button type="link"
                            onClick={() => { this.handleDelete(record.id) }}>
                        删除
                    </Button>
                    <Button
                        type="link"
                        onClick={(item) => { this.handleOpenUpdate(record) }} >
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

    private handleOpenUpdate = (record) => {
        this.setState({
            visible: true,
            user: record
        })
    };

    private closeForm = () => {
        this.setState({
            visible: false,
        });
    };

    private onCreate = async (value) => {
        if (value.id) {
            const id = await updateUser(`/users/${value.id}`, value);
            if (id) {
                message.success('修改成功', 5);
                this.setState({
                    visible: false,
                });
            };
        } else {
            const id = await saveUser('/users', value);
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
            visible: true
        })
    };

    private handleDelete = async (value) => {
        const id = await removeUser(`/users/${value}`);
        if (id) {
            message.success('删除成功', 5);
            this.loadList();
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
                        onClick={(e) => this.handleOpenCreate()}
                        >
                        新增
                    </Button>
                </div>
                <Table<UserPoJo>
                    rowKey="id"
                    columns={this.columns}
                    dataSource={this.state.users}
                    pagination={this.state.pagination} />
                <User
                    visible={this.state.visible}
                    title={'用户信息'}
                    user={this.state.user}
                    modelWidth={900}
                    menuTreeData={this.state.menuTreeData}
                    closeForm={this.closeForm}
                    onCreate={this.onCreate}
                />
            </div>
        )
    }
}