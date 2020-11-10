import React from 'react';
import axios from 'axios';
import Moment from 'moment';
import { connect } from "react-redux";

import { Button, Card, Divider  } from 'antd';

import { Typography } from 'antd';

import UpdatePromptForm from '../components/UpdatePromptForm'

const { Text } = Typography;


class PromptDetail extends React.Component {

    state = {
        prompt: {},
        selectedUsers: [],
        users: []
    }

    componentDidMount() {
        const promptID = this.props.match.params.promptID;
        axios.get(`http://0.0.0.0:8000/api/v1/prompts/${promptID}/`)
            .then(response => {
                var users_name = [];
                for(let user of response.data['added_users']){
                    users_name.push(String(user.username))
                }
                console.log(response.data)
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
        this.props.history.push('/prompts');
        window.location.reload();
    };

    handleComplite = (event, promptID) => {
        axios.get(`http://0.0.0.0:8000/api/v1/prompts/${promptID}/complite/`)
        .then(response => {console.log(response.data)})
        .catch(error => {console.log(error)});
        window.location.reload();
    };

    render() {
        return (
            <div>
                <Card title={this.state.prompt.title}>
                    <p>{this.state.prompt.description}</p>
                    <p>{this.state.prompt.place}</p>
                    <Divider />
                    <p>{Moment(this.state.promptcreate_date_time).format('MMMM Do, YYYY H:mma')}</p>
                    <p>{Moment(this.state.prompt.done_date_time).format('MMMM Do, YYYY H:mma')}</p>
                    <Divider />
                    {
                        this.state.prompt.complited ?
                            <Text type="success">Complited</Text>
                        :
                            <Text type="danger">Not complited</Text>
                    }
                    <Divider />         
                    <Button onClick={(event) => this.handleComplite(
                        event,
                        this.props.match.params.promptID
                    )} type="dashed" htmlType="submit">Complite</Button>
                </Card>
                <br />
                <p>Update prompt</p>
                <UpdatePromptForm prompt={this.state.prompt} selectedUsers={this.state.selectedUsers} users={this.state.users} promptID={this.props.match.params.promptID} btnText="Update"/>
                <Button onClick={(event) => this.handleDelete(
                    event,
                    this.props.match.params.promptID
                )} type="danger" htmlType="submit">Delete</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    };
};
  
export default connect(mapStateToProps)(PromptDetail);