import React from 'react';
import { Divider, Button, Table, Dropdown, Switch, message, Tag } from 'antd';
import { PlusCircleOutlined, DownOutlined, MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';
import Menu from '../menu/menu';
import { getMenuTree, removeMenu, getMenu, saveMenu, updateMenu } from '../../api/auth/menu';
import MenuPoJo from '../../../interface/menu';


interface IState {
    menus: object[],
    visible: boolean;
}

export default class AuthMenus extends React.Component<IState> {

    readonly state = {
        menus: [],
        menuTree: [],
        menu: {},
        menuType: 'catalog',
        visible: false,
    };

    componentWillMount() {
        this.loadList();
    };

    private loadList = async () => {

        let res = await getMenuTree('/menus/tree');
        if(!res){
        }
        let data: MenuPoJo[] = res;
        this.setState({
            menus: data,
            tableLoading: false
        });

    };

    private handleDelete = async (value) => {
        const id = await removeMenu(`/menus/${value}`);
        if (id) {
            message.success('删除成功', 5);
            this.loadList();
        };
    };
    
    columns: ColumnProps<MenuPoJo>[] = [
        {
            "align": "center",
            "title": "菜单名称",
            "dataIndex": "name",
            "key": "name",
            "width": 250,
        },
        {
            "align": "center",
            "title": "菜单编号",
            "dataIndex": "id",
            "key": "id",
        },
        {
            "align": "center",
            "title": "排序",
            "dataIndex": "sequence",
            "key": "sequence",
        },
        {
            "align": "center",
            "title": "请求地址",
            "dataIndex": "requestUrl",
            "key": "requestUrl",
        },
        {
            "align": "center",
            "title": "类型",
            "dataIndex": "type",
            "key": "type",
            render: (text, record) => {
                let color = '';
                let value = '';
                if (text =='catalog'){
                    color = '#108ee9';
                    value = '目录';
                } else if (text =='menu') {
                    color = 'lime';
                    value = '菜单';
                } else {
                    color = 'orange';
                    value = '按钮';
                }
                return (
                    <Tag color={color}>{value}</Tag>
                );
            }
        },
        {
            "align": "center",
            "title": "权限标识",
            "dataIndex": "permission",
            "key": "permission"
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
                        onClick={ (item) => { this.handleOpenUpdate(record) }}>
                        修改
                    </Button>
                </span>
            ),
        }
    ];

    private handleOpenCreate = () => {
        this.setState({
            visible: true,
            menuTree: this.state.menus,
            menu: {
                type: 'catalog'
            },
            closeForm: this.closeForm,
            onCreate: this.onCreate,
        })
    };
    
    private handleOpenUpdate = async (record) => {

           record= await getMenu(`/menus/${record.id}`);
           this.setState({
                visible: true,
                menuTree: this.state.menus,
                menu: record,
                closeForm: this.closeForm,
                onCreate: this.onCreate,
           });
    };

    private handlerChangeType = (e) => {
        this.setState({
            'menuType': e.target.value,
            menu: {
                type: e.target.value
            },
        });
    };

    private onCreate = async (value) => {
        if (value.id) {
            const id = await updateMenu(`/menus/${value.id}`, value);
            if (id) {
                message.success('修改成功', 5);
                this.setState({
                    visible: false,
                });
                this.loadList();
            };
        } else {
            const id = await saveMenu('/menus', value);
            if (id) {
                message.success('添加成功', 5);
                this.setState({
                    visible: false,
                });
                this.loadList();
            };
        }
    };

    private closeForm = () => {
        this.setState({
            visible: false,
        });
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
                <Table<MenuPoJo>
                    rowKey="id"
                    columns={this.columns}
                    dataSource={this.state.menus}
                    pagination={false}
                    expandable={{
                        expandIcon: ({ expanded, onExpand, record }) =>
                          expanded ? (
                            <MinusCircleTwoTone onClick={e => onExpand(record, e)} />
                          ) : (
                            <PlusCircleTwoTone onClick={e => onExpand(record, e)} />
                          )
                      }}/>
                <Menu
                    visible={this.state.visible}
                    menu={this.state.menu}
                    menuTree={this.state.menuTree}
                    menuType={this.state.menuType}
                    handlerChangeType={this.handlerChangeType}
                    onCreate={this.onCreate}
                    closeForm={this.closeForm}/>
            </div>
        )
    }
}