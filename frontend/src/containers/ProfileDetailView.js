import React from 'react';
import axios from 'axios';
import Moment from 'moment';
import { connect } from "react-redux";

import { Button, Card, Divider  } from 'antd';


class ProfileDetail extends React.Component {

    state = {
        user: {},
    }

    componentDidMount() {
        const promptID = this.props.match.params.promptID;
        axios.get(`http://0.0.0.0:8000/api/v1/prompts/${promptID}/`)
            .then(response => {
                var users_name = [];
                for(let user of response.data['added_users']){
                    users_name.push(String(user.username))
                }
                this.setState({
                    prompt: response.data,
                    selectedUsers: users_name
                })
            });
        axios.get('http://0.0.0.0:8000/api/v1/users/')
            .then(response => {
                var users_name = [];
                for(let user of response.data['results']){
                    users_name.push(user.username)
                }
                this.setState({
                    users: users_name
                })
            });
    }

    handleDelete = (event, promptID) => {
        axios.delete(`http://0.0.0.0:8000/api/v1/prompts/${promptID}/`)
        .then(response => {console.log(response.data)})
        .catch(error => {console.log(error)});
        this.props.history.push('/');
        this.forceUpdate();
    };

    render() {
        return (
            <div>
                <Card title={this.state.prompt.title}>
                    <Divider />
                    <p>{Moment(this.state.promptcreate_date_time).format('MMMM Do, YYYY H:mma')}</p>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    };
};
  
export default connect(mapStateToProps)(ProfileDetail);