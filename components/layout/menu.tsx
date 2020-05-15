import React from 'react';
import { Menu } from 'antd';
import {
    MenuOutlined,
    DashboardOutlined,
    UserOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import SubMenu from 'antd/lib/menu/SubMenu';
import { connect } from 'react-redux';
import { findUser } from '../../pages/api/auth/user';

interface IProps {
    user: any,
}

interface IState {
    menus: any,
};

class MenuComponent extends React.Component<IProps, IState> {

    readonly state = {
      menus: [],
    };
    
    componentDidMount() {
        this.loadUser();
    }

    private loadUser = async () => {
      let showMenus = [];
      const menus = await findUser(`/users/menus/${this.props.user.id}`);
      menus.forEach(menu => {
        showMenus.push({
           path: menu.requestUrl,
           title: menu.name,
        })
      });
      this.setState({
        menus: showMenus
      });
    };
    
    menus: any = [
        { path: "/", title: "仪表盘", icon: <DashboardOutlined/> },
        { path: "/auth/user/users", title: "用户管理", icon: <UserOutlined /> },
        // { path: "/auth/role/roles", title: "角色管理", },
        { path: "/auth/menu/menus", title: "菜单管理", icon: <MenuOutlined /> },
        // { path: "/auth/department/departments", title: "部门管理", },
        // { path: "/auth/position/positions", title: "职位管理", },
    ];

    render() {
        // console.log(this.props);
        const createMenu = (menuData) => {
            let submenuIndex = 0;
            let menu = [];
            const create = (menuData, el) => {
        
              for (let i = 0; i < menuData.length; i++) {
        
                if (menuData[i].children) {
                  let children = [];
                  create(menuData[i].children, children);
                  submenuIndex++;
                  el.push(
                    <SubMenu
                      key={`sub${submenuIndex}`}
                      title={(
                        <span style={{ height: '100%'}}>
                          {menuData[i].title}
                        </span>
                      )}
                      icon={menuData[i].icon}>
                      {children}
                    </SubMenu>
                  )
        
                } else {
                  el.push(
                    <Menu.Item key={menuData[i].path} title={menuData[i].title} icon={menuData[i].icon}>
                      <Link href={menuData[i].path}>
                        <span>{menuData[i].title}</span>
                      </Link>
                    </Menu.Item>
                  )
                }
              }
            };
            create(menuData, menu);
            return menu;
          };

        return (
            <div>
                <Menu theme="dark" mode="inline" {...this.props}>
                {createMenu(this.state.menus)}
                </Menu>
          </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
      user: state.user,
  }
};

export default connect(mapStateToProps)(MenuComponent)