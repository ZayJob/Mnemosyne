import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";

import { Select  } from 'antd';

import Prompt from '../components/Prompt'
import CreatePromptForm from '../components/CreatePromptForm'

const { Option } = Select;

class PromptList extends React.Component {

    state = {
        prompts: [],
        users: [],
        option: 'my_prompts',
    }

    handleChange = (value) => {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: "Token " + this.props.token
        }
        axios.post(`http://0.0.0.0:8000/api/v1/prompts/${value.key}/`, {
            id_user: this.props.user_id,
        })
        .then(response => {
            this.setState({
                prompts: response.data['result'],
                option: value.key
            })
        });
    }
      
    componentWillReceiveProps(newProps) {
        if (newProps.token) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: "Token " + newProps.token
            }
            axios.post(`http://0.0.0.0:8000/api/v1/prompts/${this.state.option}/`, {
                id_user: newProps.user_id,
            })
            .then(response => {
                this.setState({
                    prompts: response.data['result']
                })
            });
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: "Token " + newProps.token
            }
            axios.get('http://0.0.0.0:8000/api/v1/users/')
            .then(response => {
                this.setState({
                    users: response.data['results']
                })
            });
        }
    }

    render() {
        return (
            <div>
                <Select
                    labelInValue
                    defaultValue={{ value: 'my_prompts' }}
                    style={{ width: 120 }}
                    onChange={this.handleChange}
                >
                    <Option value="my_prompts">My prompts</Option>
                    <Option value="others_prompts">Others</Option>
                    <Option value="all_prompts">All</Option>
                </Select>
                <Prompt data={this.state.prompts}/>
                <br />
                <p>Create Prompt</p>
                <CreatePromptForm users={this.state.users} btnText="Create"/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log("okokoi", state)
    return {
        token: state.token,
        user_id: state.user_id
    };
};
  
export default connect(mapStateToProps)(PromptList);