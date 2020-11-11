import React from 'react';
import { Form, Input, Button, Alert} from 'antd';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';


class NormalLoginForm extends React.Component {
    onFinish = (values) => {
        this.props.onAuth(values.username, values.password);
        if (this.props.error === null) {
            this.props.history.push('/prompts');
        }
    };

    render () {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = this.props.error.message
        }
        return (
            <div>
                <Form
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={this.onFinish}
                >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                {
                    (this.props.error) ?
                        <p><Alert message={errorMessage} type="error" /></p>
                    :
                        <p></p>
                }
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                    Login
                    </Button>
                </Form.Item>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);