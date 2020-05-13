import React from 'react';
import { Form, Modal, Row, Col, TreeSelect, Input, Radio } from 'antd';

interface IProps {
    visible: boolean;
    deptTree: any;
    closeForm: any;
    onCreate: any;
    dept: object;
}

export default class Department extends React.Component<IProps> {
    readonly state = {
        pid: '',
        status: true,
        dept: {},
    };

    render() {
        const visible = this.props.visible;
        const deptTree = this.props.deptTree;
        const closeForm = this.props.closeForm;
        const onCreate = this.props.onCreate;
        const dept: any = this.props.dept;
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

        const DeptModelForm = ({ visible }) => {
            const [form] = Form.useForm();
            return (
              <Modal
                visible={visible}
                title='添加部门'
                okText="保存"
                cancelText="取消"
                onCancel={(e) => {
                  closeForm(false);
                }}
                onOk={() => {
                  form
                    .validateFields()
                    .then(values => {
                        values.id = dept.id;
                        onCreate(values);
                    })
                    .catch(info => {
                      console.log('Validate Failed:', info);
                    });
                }}>
                <Form
                    form={form}
                    {...layout}
                    initialValues={dept}
                    >
                    <Row gutter={24}>
                                <Col span={24}>
                                    <Form.Item
                                        name="pid"
                                        label="上级部门"
                                        rules={[{ required: true, message: '请选择上级部门!' }]}>
                                        <TreeSelect
                                            style={{ width: '100%' }}
                                            value={this.state.pid}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            treeData={deptTree}
                                            placeholder="请选择上级部门"
                                            treeDefaultExpandAll/>
                                    </Form.Item>
                                </Col>

                                <Col span={24}>
                                    <Form.Item
                                        name="name"
                                        label="部门名称"
                                        rules={[{ required: true, message: '请填写部门名称!' }]}>
                                        <Input autoComplete="off"/>
                                    </Form.Item>
                                </Col>

                                <Col span={24}>
                                    <Form.Item
                                        name="sequence"
                                        label="显示排序"
                                        rules={[{ required: true, message: '请填写排序!' }]}>
                                        <Input type='number' autoComplete="off"/>
                                    </Form.Item>
                                </Col>

                                <Col span={24}>
                                    <Form.Item
                                        name="eadingCadre"
                                        label="负责人">
                                        <Input autoComplete="off"/>
                                    </Form.Item>
                                </Col>

                                <Col span={24}>
                                    <Form.Item
                                        name="phone"
                                        label="联系电话">
                                        <Input autoComplete="off"/>
                                    </Form.Item>
                                </Col>

                                <Col span={24}>
                                    <Form.Item
                                        name="email"
                                        label="邮箱">
                                        <Input autoComplete="off"/>
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
                </Form>
              </Modal>
            );
        }
        return (
            <div>
                <DeptModelForm
                    visible={visible}
                />
            </div>
        )
    }
}