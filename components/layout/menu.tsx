import React, { Component } from 'react';
import { Menu } from 'antd';
import {
    BlockOutlined,
    DashboardOutlined,
    TrademarkCircleOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import SubMenu from 'antd/lib/menu/SubMenu';

export default class MenuComponent extends React.Component {

    menus: any = [
        { path: "/", title: "仪表盘", icon: <DashboardOutlined/> },
        {
          path: "/auth", title: "权限管理", icon: <TrademarkCircleOutlined />,
          children: [
            { path: "/auth/user/users", title: "用户管理", },
            { path: "/auth/roles", title: "角色管理", },
            { path: "/auth/menu/menus", title: "菜单管理", },
            { path: "/auth/department/departments", title: "部门管理", },
            { path: "/auth/position/positions", title: "职位管理", },
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
                {createMenu(this.menus)}
                </Menu>
          </div>
        )
    }
}
