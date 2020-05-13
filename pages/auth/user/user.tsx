import React from 'react';
import { Form, Row, Col, Button, Input, Divider, Select, Radio, TreeSelect, message, Modal, Tree } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

interface IProps {
    // url: any,
    visible: boolean;
    title: string;
    modelWidth: number;
    // closeForm: any;
    // onCreate: any;
    // position: object;
}

export default class User extends React.Component<IProps> {

    render() {

        const visible = this.props.visible;
        const title = this.props.title;
        const modelWidth = this.props.modelWidth;
        // const closeForm = this.props.closeForm;
        // const onCreate = this.props.onCreate;
        // const position: any = this.props.position;
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

        const treeData = [
            {
              title: 'parent 1',
              key: '0-0',
              children: [
                {
                  title: 'parent 1-0',
                  key: '0-0-0',
                  disabled: true,
                  children: [
                    {
                      title: 'leaf',
                      key: '0-0-0-0',
                      disableCheckbox: true,
                    },
                    {
                      title: 'leaf',
                      key: '0-0-0-1',
                    },
                  ],
                },
                {
                  title: 'parent 1-1',
                  key: '0-0-1',
                  children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }],
                },
              ],
            },
          ];

        const PositionModelForm = ({ visible }) => {
            const [form] = Form.useForm();
            return (
                <Modal
                    visible={visible}
                    title={title}
                    okText="保存"
                    cancelText="取消"
                    onCancel={(e) => {
                        // closeForm(false);
                    }}
                    onOk={() => {
                        form
                            .validateFields()
                            .then(values => {
                                console.log(values)
                                // values.id = position.id;
                                // onCreate(values);
                            })
                            .catch(info => {
                            });
                    }}
                    width={modelWidth}>
                    <Form
                        form={form}
                        {...layout}
                    // initialValues={position}
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
                                <Form.Item
                                    name="departmentId"
                                    label="所属部门">
                                     <Tree
                                        checkable
                                        defaultExpandedKeys={['0-0-0', '0-0-1']}
                                        defaultSelectedKeys={['0-0-0', '0-0-1']}
                                        defaultCheckedKeys={['0-0-0', '0-0-1']}
                                        // onSelect={onSelect}
                                        // onCheck={onCheck}
                                        treeData={treeData}
                                        />
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
                                <Form.Item name="positionId" label="岗位">
                                    <Select placeholder="所属岗位">
                                        {/* {
                                            this.state.positions.map((item: PositionPoJo) => (
                                                <Option value={item.id}>{item.name}</Option>
                                            ))
                                        } */}
                                    </Select>
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
                                <Form.Item name="roleIds" label="角色">
                                    <Select mode="multiple" placeholder="角色">
                                        {/* {
                                            this.state.roles.map((item: RolePoJo) => (
                                                <Option value={item.id}>{item.name}</Option>
                                            ))
                                        } */}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item name="mark" label="备注">
                                    <TextArea rows={24} style={{
                                        height: 50,
                                    }} />
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