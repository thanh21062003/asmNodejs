import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import type { MenuProps } from 'antd';
const { Header, Content, Footer } = Layout;
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    // getItem( <Link to={`/admin`}>Dashboard</Link>,  'dashboard',),
    getItem(<Link to={`/`}>Products</Link>, 'products'),
    getItem(<Link to={`/register`}>Đăng Ký</Link>, 'register'),
    getItem(<Link to={`/login`}>Đăng Nhập</Link>, 'login'),
    //   getItem('User', 'sub1', <UserOutlined />, [
    //     getItem('Tom', '3'),
    //     getItem('Bill', '4'),
    //     getItem('Alex', '5'),
    //   ]),
    // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    // getItem(<Link to={`/admin/products`}>Categories</Link>, 'categories ', <FileOutlined />),
];
const WebsiteLayout = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout className="layout">
            <Header>
                {/* <div className="logo" /> */}
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items}
                />
                {/* <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} /> */}
            </Header>
            <Content style={{ padding: '70px 50px' }}>
                <div
                    className="site-layout-content"
                    style={{ background: colorBgContainer }}
                >
                    <Outlet />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2023 Created by Ant UED
            </Footer>
        </Layout>
    );
};

export default WebsiteLayout;
