import React from 'react';

import { Layout, Menu } from 'antd';

import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const { Header, Content, Footer } = Layout;

const CustomLayout = (props) => {
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                    {
                        props.isAuthenticated ?
                            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                                <Menu.Item key="1" to='/profile'>Profile</Menu.Item>
                                <Menu.Item key="2"><Link to='/'>Prompts</Link></Menu.Item>
                                <Menu.Item 
                                    key="3" 
                                    onClick={props.logout}
                                >
                                    Logout
                                </Menu.Item>
                            </Menu>
                        :
                            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                                <Menu.Item key="1"><Link to='/login'>Login</Link></Menu.Item>
                                <Menu.Item key="2"><Link to='/signup'>Signup</Link></Menu.Item>
                            </Menu>
                    }
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

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(actions.logout())
            window.history.push('/login')
        }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));