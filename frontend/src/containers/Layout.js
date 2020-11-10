import React from 'react';

import { Layout, Menu } from 'antd';

import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {

    handleLogout = (e) => {
        this.props.logout();
        this.props.history.push('/');
        window.location.reload();
    }

    handleMoveToPrompts = (e) => {
        this.props.history.push('/prompts');
        window.location.reload();
    }

    handleMoveToProfile = (e) => {
        this.props.history.push('/profile');
        window.location.reload();
    }

    render () {
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                        {
                            this.props.isAuthenticated ?
                                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                                    <Menu.Item key="1" onClick={this.handleMoveToProfile}>Profile</Menu.Item>
                                    <Menu.Item key="2" onClick={this.handleMoveToPrompts}>Prompts</Menu.Item>
                                    <Menu.Item key="3" onClick={this.handleLogout}>Logout</Menu.Item>
                                </Menu>
                            :
                                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                                    <Menu.Item key="1"><Link to='/'>Login</Link></Menu.Item>
                                    <Menu.Item key="2"><Link to='/signup'>Signup</Link></Menu.Item>
                                </Menu>
                        }
                </Header>
                <Content style={{ padding: '50px 400px 0px 400px' }}>
                    <div className="site-layout-content">
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Vlad Bubeniuk @ 2020</Footer>
            </Layout>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(actions.logout())
        }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));