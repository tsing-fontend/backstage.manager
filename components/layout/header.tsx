import React from 'react';
import { Layout, Avatar, Dropdown, Menu } from 'antd';
const { Header } = Layout;
import { UserOutlined,
    DownOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux';

interface IProps {
    user: any,
}

class HeaderComponent extends React.Component<IProps> {

    menu = (
        <Menu>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                退出登陆
            </a>
          </Menu.Item>
        </Menu>
    );
    
    render() {
        const { nickName } = this.props.user;
        return (
            <div>
                <Header className="site-layout-background" style={{ padding: 0 }} >
                    <div style={{
                        float: "right",
                        marginRight: 40
                    }}>
                        <span style={{
                            margin: 5
                        }}>
                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                        </span>
                        <span style={{
                            margin: 5
                        }}>
                            <Dropdown overlay={this.menu}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    { nickName } <DownOutlined />
                                </a>
                            </Dropdown>
                        </span>
                    </div>
                </Header>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
};

export default connect(mapStateToProps)(HeaderComponent);