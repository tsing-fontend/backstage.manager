import React from 'react';
import { Modal, Form, Row, Col, Input, Radio, Tree } from 'antd';

interface IProps {
    visible: boolean;
    closeForm: any;
    onCreate: any;
    role: object;
    menus: any;
}

export default class Role extends React.Component<IProps> {

    render() {
        const visible = this.props.visible;
        const closeForm = this.props.closeForm;
        const onCreate = this.props.onCreate;
        const role: any = this.props.role;
        const menus = this.props.menus;
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

        const RoleModelForm = ({ visible }) => {
            const [form] = Form.useForm();
            return (
                <Modal
                    visible={visible}
                    title='角色管理'
                    okText="保存"
                    cancelText="取消"
                    onCancel={(e) => {
                        closeForm(false);
                    }}
                    onOk={() => {
                        form
                            .validateFields()
                            .then(values => {
                                values.id = role.id;
                                onCreate(values);
                            })
                            .catch(info => {
                            });
                    }}>
                    <Form
                        form={form}
                        {...layout}
                        initialValues={role}>
                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item
                                    name="name"
                                    label="角色名称"
                                    rules={[{ required: true, message: '请填写角色名!' }]}>
                                    <Input autoComplete="off" />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    name="permission"
                                    label="权限字符"
                                    rules={[{ required: true, message: '请填写权限字符!' }]}>
                                    <Input autoComplete="off" />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    name="sequence"
                                    label="显示顺序"
                                    rules={[{ required: true, message: '请填写显示顺序!' }]}>
                                    <Input autoComplete="off" type='number' />
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

                            <Col span={24}>
                                <Form.Item
                                    name="mark"
                                    label="备注">
                                    <Input autoComplete="off"/>
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    name="paramMenus"
                                    label="菜单权限">
                                    <Tree
                                        checkable
                                        showLine={true}
                                        showIcon={true}
                                        onCheck={(e) => {
                                            form.setFieldsValue({
                                                'paramMenus': e
                                            })
                                        }}
                                        treeData={menus}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            );
        }
        return (
            <div>
                <RoleModelForm
                    visible={visible}
                />
            </div>
        )
    }
}
