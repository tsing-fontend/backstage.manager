import React from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { Form, Button, Divider, message } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { loginUser } from '../api/auth/user';
import * as userActions from '../../actions/user';
import { bindActionCreators } from 'redux';
import './index.css';

interface Props {
    userActions: any,
}
class Index extends React.Component<Props> {
    
    private onFinish = async value => {
        // const user = await loginUser(`/login`, value);
        if (true) {
            this.props.userActions.saveUser({"id":'416667e828ae4fcdbc683e2fb1a67996',"nickName": '青衣'});
            message.success('登陆成功', 5);
            Router.push('/');
        } else {
            message.error('账号或者密码错误', 15);
        }
    };
    
    render() {
        return (
            <div>
                <div className="loginContainer">
                    <div className="content">
                        <h2 className="title">Tsing 登陆</h2>
                        <Form
                            name="normal_login"
                            onFinish={this.onFinish}
                            className="login-form">
                            <Form.Item
                                name="phone">
                                <div className="phoneBox">
                                    <input
                                        type="text"
                                        style={{

                                        }}
                                        className="phone"
                                        placeholder="phone" />
                                </div>
                            </Form.Item>
                            <Form.Item
                                name="password">
                                <div className="phoneBox">
                                    <input
                                        type="password"
                                        style={{

                                        }}
                                        className="phone"
                                        placeholder="password" />
                                </div>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    style={{
                                        width: 400,
                                        height: 45,
                                        marginLeft: 33
                                    }}
                                    type="primary"
                                    shape="round"
                                    htmlType="submit"
                                    icon={<LoginOutlined />}>
                                    登陆
                                </Button>
                            </Form.Item>

                        </Form>
                        <div className="help">
                            需要帮助？
                        </div>
                    </div>
                    <div className="registerContent">
                        <h2 className="title">没有账户？</h2>
                        <Button
                            style={{
                                width: 400,
                                height: 45,
                                marginLeft: 33,
                                color: 'black'
                            }}
                            shape="round"
                            icon={<LoginOutlined />}>
                            创建账户
                        </Button>
                        <div className="footer">
                            © Tsing <Divider type="vertical" />  使用条款 <Divider type="vertical" /> 隐私政策
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (despatch) => {
    return {
        userActions: bindActionCreators(userActions, despatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Index)