import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Modal, Form, Row, Col, Input, Radio, Upload, Button, message } from 'antd';
import * as qiniu from 'qiniu-js'
import { qinNiuToken } from '../api/third/qiniu';


interface IState {
    modelName: string,
    visible: boolean,
    closeForm: any,
    onCreate: any,
    pig: object
}

interface IProp {
}

export default class Pig extends React.Component<IState, IProp> {

    render() {
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

        const autoSize = { minRows: 6, maxRows: 32 };


        const { modelName, visible, closeForm, onCreate } = this.props;
        let pig: any = this.props.pig;

        const MenuModelForm = ({ visible }) => {
            const [form] = Form.useForm();
            return (
                <Modal
                    visible={visible}
                    title={modelName}
                    okText="保存"
                    cancelText="取消"
                    onCancel={(e) => {
                        closeForm(false);
                    }}
                    onOk={() => {
                        form
                            .validateFields()
                            .then(values => {
                                values.id = pig.id;
                                onCreate(values);
                            })
                            .catch(info => {
                            });
                    }}
                    width={730}>
                    <Form
                        form={form}
                        {...layout}
                        initialValues={pig}>
                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item
                                    name='title'
                                    label="名称"
                                    rules={[{ required: true, message: '请填写产品名称!' }]}>
                                    <Input autoComplete="off" />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    name="sequence"
                                    label="展示顺序"
                                    rules={[{ required: true, message: '请填写展示顺序!' }]}>
                                    <Input autoComplete="off" />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item name="recommend" label="是否推荐">
                                    <Radio.Group>
                                        <Radio value={true}>是</Radio>
                                        <Radio value={false}>否</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    name="remark"
                                    label="描述信息"
                                    rules={[{ required: true, message: '请填写产品描述!' }]}>
                                    <Input.TextArea
                                        autoSize={autoSize}
                                        autoComplete="off"
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    name="imageUrl"
                                    label="图片"
                                    rules={[{ required: true, message: '请填写选择图片!' }]}>
                                    <Input autoComplete="off"/>
                                </Form.Item>
                            </Col>

                        </Row>
                    </Form>
                </Modal>
            );
        };

        return (
            <MenuModelForm visible={visible} />
        )
    }
}
