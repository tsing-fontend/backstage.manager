import React from 'react';
import { Form, Row, Col, Input, Select, Radio, TreeSelect, Modal } from 'antd';
const { Option } = Select;
const { SHOW_ALL } = TreeSelect;

interface IProps {
    visible: boolean;
    title: string;
    user: object;
    modelWidth: number;
    menuTreeData: any,
    closeForm: any;
    onCreate: any;
}

export default class User extends React.Component<IProps> {

    render() {

        const visible = this.props.visible;
        const title = this.props.title;
        const modelWidth = this.props.modelWidth;
        const treeData = this.props.menuTreeData;
        const closeForm = this.props.closeForm;
        const onCreate = this.props.onCreate;
        const user:any = this.props.user;
        const menu:any = user.menu;
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

        const tProps = {
            defaultValue:menu,
            treeData,
            treeCheckable: true,
            showCheckedStrategy: SHOW_ALL,
            placeholder: '请选择...',
            style: {
              width: '100%',
            },
          };

        const PositionModelForm = ({ visible }) => {
            const [form] = Form.useForm();
            return (
                <Modal
                    visible={visible}
                    title={title}
                    okText="保存"
                    cancelText="取消"
                    onCancel={(e) => {
                        closeForm(false);
                    }}
                    onOk={() => {
                        form
                            .validateFields()
                            .then(values => {
                                values.id = user.id;
                                onCreate(values);
                            })
                            .catch(info => {
                            });
                    }}
                    width={modelWidth}>
                    <Form
                        form={form}
                        {...layout}
                    initialValues={user}
                    >
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name='nickName'
                                    label="登陆名称"
                                    rules={[{ required: true, message: '请填写登陆名称!' }]}>
                                    <Input autoComplete="off" />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="用户名称"
                                    rules={[{ required: true, message: '请填写用户名称!' }]}>
                                    <Input autoComplete="off" />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    name="phone"
                                    label="手机号"
                                    rules={[{ required: true, message: '请填写手机号!' }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                         
                            <Col span={12}>
                                <Form.Item
                                    name="email"
                                    label="邮箱"
                                    rules={[{ required: true, message: '请填写邮箱!' }]}>
                                    <Input autoComplete="off" />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item name="status" label="状态">
                                    <Radio.Group>
                                        <Radio value={true}>正常</Radio>
                                        <Radio value={false}>禁用</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item name="sex" label="性别">
                                    <Select placeholder="请选择性别">
                                        <Option value="man">男</Option>
                                        <Option value="woman">女</Option>
                                        <Option value="unknown">未知</Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item name="menu" label="菜单权限">
                                    <TreeSelect {...tProps} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            );
        }
        return (
            <div>
                <PositionModelForm
                    visible={visible} />
            </div>
        )
    }
}