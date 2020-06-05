import React from 'react';
import { Modal, Form, Row, Col, Input, Radio, Upload } from 'antd';
import { qinNiuToken } from '../api/third/qiniu';
import ImageUpload from '../components/image.upload';
import ImgCrop from 'antd-img-crop';

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

    readonly state = {
        imageUrl: '',
    };


    private handlerShowPic = (value) => {
        if (value && value.file && value.file && value.file.response) {
            this.setState({
                imageUrl: value.file.response.key
            });
        }
    };

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

        const fileList = [{
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          }];

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
                                values.imageUrl = `http://qiniu.tying.info/${this.state.imageUrl}`;
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

                            {/* <Col span={24}>
                                <Form.Item name="file" valuePropName="fileList"  noStyle>
                                    <ImgCrop rotate>
                                        <Upload
                                            name="file"
                                            listType="picture-card"
                                            onChange={this.handlerShowPic}
                                            action="https://upload-z1.qiniup.com"
                                            data={this.state.qinniu}>
                                            {fileList.length < 5 && '+ 上传'}
                                        </Upload>
                                     </ImgCrop>
                                </Form.Item>
                            </Col> */}

                            <Col span={24}>
                                <ImageUpload
                                    fileList={fileList}
                                    handlerShowPic={this.handlerShowPic}
                                />
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
