import React from 'react';
import { Menu} from 'antd';
import {
    DashboardOutlined,
    ContainerOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import SubMenu from 'antd/lib/menu/SubMenu';
import { connect } from 'react-redux';

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

    menus: any = [
        { path: "/", title: "仪表盘", icon: <DashboardOutlined/> },
        {
          title: "产品维护",
          icon: <ContainerOutlined />,
          children: [
            {
              path: "/cms/pigs",
              title: "技术猪"
            }
          ]
        }
    ];

    render() {
      
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
                      icon={menuData[i].icon}
                      // icon={<Icon/>}
                      >
                      {children}
                    </SubMenu>
                  )
        
                } else {
                  el.push(
                    <Menu.Item key={menuData[i].path} title={menuData[i].title}
                       icon={menuData[i].icon}
                      >
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
                {createMenu(this.menus)}
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