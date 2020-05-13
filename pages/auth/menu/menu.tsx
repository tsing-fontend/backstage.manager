import React from 'react';
import { Modal, Form, Row, Col, Input, Radio, TreeSelect } from 'antd';

interface IProps {
    visible: boolean;
    menu: object;
    menuTree: any;
    menuType: String;
    closeForm: any;
    onCreate: any;
    handlerChangeType: any;
    
}

export default class Menu extends React.Component<IProps> {

    readonly state = {
        pid: '',
        status: true,
        menu: {},
    };

    private content = (value) => {
        let content: any;

        if (value == 'menu') {
                content = (
                    <Row gutter={24}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="菜单名称"
                                rules={[{ required: true, message: '请填写菜单名称!' }]}>
                                <Input autoComplete="off"/>
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                name="requestUrl"
                                label="请求地址"
                                rules={[{ required: true, message: '请填写菜单名称!' }]}>
                                <Input autoComplete="off"/>
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                name="permission"
                                label="权限标识"
                                rules={[{ required: true, message: '请填写菜单名称!' }]}>
                                <Input autoComplete="off"/>
                            </Form.Item>
                        </Col>
    
                        <Col span={24}>
                            <Form.Item
                                name="sequence"
                                label="显示排序"
                                rules={[{ required: true, message: '请填写排序!' }]}>
                                <Input
                                    type='number'
                                    autoComplete="off"/>
                            </Form.Item>
                        </Col>
    
                        <Col span={24}>
                            <Form.Item name="status" label="状态">
                                <Radio.Group>
                                    <Radio value={true}>正常</Radio>
                                    <Radio value={false}>禁用</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                )
        } else if (value == 'catalog') {
            content = (
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item
                            name="name"
                            label="菜单名称"
                            rules={[{ required: true, message: '请填写菜单名称!' }]}>
                            <Input autoComplete="off"/>
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            name="sequence"
                            label="显示排序"
                            rules={[{ required: true, message: '请填写排序!' }]}>
                            <Input
                                type='number'
                                autoComplete="off"/>
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item name="status" label="状态">
                            <Radio.Group>
                                <Radio value={true}>正常</Radio>
                                <Radio value={false}>禁用</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
            )
        } else if (value == 'button') {
            content = (
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item
                            name="name"
                            label="菜单名称"
                            rules={[{ required: true, message: '请填写菜单名称!' }]}>
                            <Input autoComplete="off"/>
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            name="permission"
                            label="权限标识"
                            rules={[{ required: true, message: '请填写菜单名称!' }]}>
                            <Input autoComplete="off"/>
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            name="sequence"
                            label="显示排序"
                            rules={[{ required: true, message: '请填写排序!' }]}>
                            <Input
                                type="number"
                                autoComplete="off"/>
                        </Form.Item>
                    </Col>
                    
                </Row>
            )
        }
        return content;
    };

    render() {
        const visible = this.props.visible;
        const menuTree = this.props.menuTree;
        const menuType = this.props.menuType;
        const handlerChangeType = this.props.handlerChangeType
        const closeForm = this.props.closeForm;
        const onCreate = this.props.onCreate;
        let menu: any = this.props.menu;


        const layout = {
            labelCol: {
                xs: { span: 10 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 15, push: 1 },
            },
        };

        const MenuModelForm = ({ visible }) => {
            const [form] = Form.useForm();
            return (
                <Modal
                    visible={visible}
                    title='添加菜单'
                    okText="保存"
                    cancelText="取消"
                    onCancel={(e) => {
                          closeForm(false);
                    }}
                    onOk={() => {
                        form
                            .validateFields()
                            .then(values => {
                                values.id = menu.id;
                                onCreate(values);
                            })
                            .catch(info => {
                                console.log('Validate Failed:', info);
                            });
                    }}>
                    <Form
                        form={form}
                        {...layout}
                        initialValues={menu}>
                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item
                                    name="pid"
                                    label="上级菜单"
                                    rules={[{ required: true, message: '请选择上级菜单!' }]}>
                                    <TreeSelect
                                        style={{ width: '100%' }}
                                        // value={this.state.pid}
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        treeData={menuTree}
                                        placeholder="请选择"
                                        treeDefaultExpandAll/>
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    name="type"
                                    label="菜单类型"
                                    rules={[{ required: true, message: '请选择菜单类型!' }]}>
                                    <Radio.Group onChange={ (e) => handlerChangeType(e) }>
                                        <Radio value={'catalog'}>目录</Radio>
                                        <Radio value={'menu'}>菜单</Radio>
                                        <Radio value={'button'}>按钮</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            {this.content(menuType)}

                        </Row>
                    </Form>
                </Modal>
            );
        }
        return (
            <div>
                <MenuModelForm
                    visible={visible}
                />
            </div>
        )
    }
}