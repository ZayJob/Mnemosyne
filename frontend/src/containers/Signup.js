import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

import { Form, Input, Tooltip, Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';


const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

class RegistrationForm extends React.Component {

    onFinish = (values) => {
        console.log('Received values of form: ', values);
        this.props.onAuth(values.nickname, values.email, values.confirm);
        this.props.history.push('/');
    };

    render() {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }
        return (
            <Form
            {...formItemLayout}
            name="register"
            onFinish={this.onFinish}
            scrollToFirstError
            >
                <p>Signup form</p>
                <Form.Item
                name="email"
                label="E-mail"
                rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
                ]}
            >
                <Input />
            </Form.Item>
        
            <Form.Item
                name="password"
                label="Password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>
        
            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
        
                    return Promise.reject('The two passwords that you entered do not match!');
                    },
                }),
                ]}
            >
                <Input.Password />
            </Form.Item>
        
            <Form.Item
                name="nickname"
                label={
                <span>
                    Nickname&nbsp;
                    <Tooltip title="What do you want others to call you?">
                    <QuestionCircleOutlined />
                    </Tooltip>
                </span>
                }
                rules={[
                {
                    required: true,
                    message: 'Please input your nickname!',
                    whitespace: true,
                },
                ]}
            >
                <Input />
            </Form.Item>
        
                {errorMessage}
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                    Register
                    </Button>
                </Form.Item>
        
            </Form>
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
        onAuth: (username, email, password) => dispatch(actions.authSignup(username, email, password)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);