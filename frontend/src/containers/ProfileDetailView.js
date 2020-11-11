import React from 'react';
import axios from 'axios';
import Moment from 'moment';
import { connect } from "react-redux";

import { Image, Card, Divider  } from 'antd';


class ProfileDetail extends React.Component {

    state = {
        id_user: null,
        user: {},
        user_avatar: ''
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: "Token " + newProps.token
            }
            axios.get(`http://0.0.0.0:8000/api/v1/users/${newProps.user_id}/`)
            .then(response => {
                this.setState({
                    user: response.data,
                    user_avatar: response.data.profile.avatar
                })
            });
        }
    }

    render() {
        return (
            <div>
                <Card title={this.state.user.username} >
                    <Image
                    width={200}
                    src={this.state.user_avatar}
                    />
                    <Divider />
                    <p>Email: {this.state.user.email}</p>
                    <p>Last login: {Moment(this.state.user.last_login).format('MMMM Do, YYYY H:mma')}</p>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        user_id: state.user_id
    };
};
  
export default connect(mapStateToProps)(ProfileDetail);