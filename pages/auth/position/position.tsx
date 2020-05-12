import React from 'react';
import { Form, Modal, Row, Col, Input, Radio } from 'antd';

interface IProps {
    visible: boolean;
    closeForm: any;
    onCreate: any;
    position: object;
}

export default class Position extends React.Component<IProps> {

    render() {

        const { visible, closeForm, onCreate } = this.props;
        const position:any = this.props.position;
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

        const PositionModelForm = ({ visible }) => {
            const [form] = Form.useForm();
            return (
                <Modal
                    visible={visible}
                    title='职位管理'
                    okText="保存"
                    cancelText="取消"
                    onCancel={(e) => {
                        closeForm(false);
                    }}
                    onOk={() => {
                        form
                            .validateFields()
                            .then(values => {
                                values.id = position.id;
                                onCreate(values);
                            })
                            .catch(info => {
                            });
                    }}>
                    <Form
                        form={form}
                        {...layout}
                        initialValues={position}
                    >
                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item
                                    name="name"
                                    label="岗位名称"
                                    rules={[{ required: true, message: '请填写岗位名!' }]}>
                                    <Input autoComplete="off" />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    name="positionId"
                                    label="岗位编码"
                                    rules={[{ required: true, message: '请填写岗位编码!' }]}>
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
                                <Form.Item name="status" label="岗位状态">
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
                                    <Input autoComplete="off" />
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
