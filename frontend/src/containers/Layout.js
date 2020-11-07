import React from 'react';

import { Layout, Menu } from 'antd';

import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const CustomLayout = (props) => {
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1"><Link to='/'>Prompts</Link></Menu.Item>
                    <Menu.Item key="2">Profile</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    {props.children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Vlad Bubeniuk @ 2020</Footer>
        </Layout>
    )
}

export default CustomLayout;