import React from 'react';
import { Form, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { qinNiuToken } from '../api/third/qiniu';

interface IProps {
    fileList: any,
    handlerShowPic: any;
};

export default class ImageUpload extends React.Component<IProps> {

    readonly state = {
        qinniu: {
            key:'',
            token: ''
        },
        imageUrl: {}
    };

    async componentDidMount () {
        const token = await qinNiuToken(`/qiniu/token?expires=${Math.ceil(new Date().getTime()/1000)}`);
        this.setState({
            qinniu: {
                token: token,
                key: Math.ceil(new Date().getTime()/1000)
            },
        });
    };

    render() {

        const { fileList, handlerShowPic } = this.props;

        return (
            <div>
                <Form.Item name="file" valuePropName="fileList"  noStyle>
                    <ImgCrop rotate>
                        <Upload
                            name="file"
                            listType="picture-card"
                            onChange={ handlerShowPic }
                            action="https://upload-z1.qiniup.com"
                            data={this.state.qinniu}
                            >
                            {fileList.length < 5 && '+ 上传'}
                        </Upload>
                    </ImgCrop>
                </Form.Item>
            </div>
        )
    }
}
