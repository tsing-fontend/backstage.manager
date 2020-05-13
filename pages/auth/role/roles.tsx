import React from 'react';
import { Divider, Button, Table, Dropdown, Switch, Menu, Tag, message } from 'antd';
import { PlusCircleOutlined, DownOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';
import moment from 'moment';
import Role from './role';
import { getRoles, removeRole, updateRole, saveRole } from '../../api/auth/role';
import RolePoJo from '../../../interface/role';
import { getMenuTree } from '../../api/auth/menu';
import MenuPoJo from '../../../interface/menu';

interface IState {
    roles: object[],
    pagination: object,
}

export default class Roles extends React.Component<IState> {

    readonly state = {
        visible: false,
        roles: [],
        menus: [],
        role: {},
        pagination: {},
        tableLoading: true,
    };

    componentWillMount() {
        this.loadList();
    };

    private current: number | undefined = undefined;
    private size: number | undefined = undefined;

    private loadList = async () => {

        let current: number = this.current === undefined ? 1 : this.current;
        let size: number = this.size === undefined ? 5 : this.size;

        let url = `/roles?current=${current}&size=${size}`;

        const res = await getRoles(url);
        let data: RolePoJo[] = res.records;
        const pagination = {
            showSizeChanger: true,
            total: res.total,
            pageSize: res.size,
            showTotal: ((total) => {
                return `共 ${total} 条`;
            }),
        };
        this.setState({
            roles: data,
            pagination: pagination,
            tableLoading: false
        });

        const menuTree = await getMenuTree('/menus/authMenuTree');
        let menuData: MenuPoJo[] = menuTree;
        this.setState({
            menus: menuData
        });

    };

    menu = (
        <Menu>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                数据权限
            </a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
               分配用户
            </a>
          </Menu.Item>
        </Menu>
    );
    
    columns: ColumnProps<RolePoJo>[] = [
        {
            "align": "center",
            "title": "角色ID",
            "dataIndex": "id",
            "key": "id"
        },
        {
            "align": "center",
            "title": "名称",
            "dataIndex": "name",
            "key": "name"
        },
        {
            "align": "center",
            "title": "权限字符",
            "dataIndex": "permission",
            "key": "permission"
        },
        {
            "align": "center",
            "title": "显示顺序",
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
                        onClick={() => { this.handleDelete(record.id) }}>
                        删除
                    </Button>
                    <Button
                        type="link"
                        onClick={ (item) => { this.handleOpenUpdate(record) }}
                         >
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

    private handleDelete = async (value) => {
        const id = await removeRole(`/roles/${value}`);
        if (id) {
            message.success('删除成功', 5);
            this.loadList();
        };
    };
    
    private handleOpenUpdate = (record) => {
        this.setState({
            visible: true,
            role: record,
        })
    };

    private closeForm = (value) => {
        this.setState({
            visible: value,
        });
    };

    private handleOpenCreate = () => {
        this.setState({
            visible: true,
            role: {}
        })
    };

    private onCreate = async (value) => {
        if (value.id) {
            const id = await updateRole(`/roles/${value.id}`, value);
            if (id) {
                message.success('修改成功', 5);
                this.setState({
                    visible: false,
                });
                this.loadList();
            };
        } else {
            const id = await saveRole('/roles', value);
            if (id) {
                message.success('添加成功', 5);
                this.setState({
                    visible: false,
                });
                this.loadList();
            };
        }

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
                <Table<RolePoJo>
                    rowKey="id"
                    columns={this.columns}
                    dataSource={this.state.roles}
                    pagination={this.state.pagination} />
                <Role
                    visible={this.state.visible}
                    closeForm={this.closeForm}
                    onCreate={this.onCreate}
                    role={this.state.role}
                    menus={this.state.menus}/>
            </div>
        )
    }
}