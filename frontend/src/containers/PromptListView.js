import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";

import Prompt from '../components/Prompt'
import CreatePromptForm from '../components/CreatePromptForm'


class PromptList extends React.Component {

    state = {
        prompts: [],
        users: []
    }

    componentDidMount() {
        axios.get('http://0.0.0.0:8000/api/v1/prompts/')
            .then(response => {
                this.setState({
                    prompts: response.data['results']
                })
                console.log(response.data['results']);
            });
        axios.get('http://0.0.0.0:8000/api/v1/users/')
            .then(response => {
                this.setState({
                    users: response.data['results']
                })
                console.log(response.data['results']);
            });
    }

    render() {
        return (
            <div>
                <Prompt data={this.state.prompts}/>
                <br />
                <p>Create Prompt</p>
                <CreatePromptForm users={this.state.users} btnText="Create"/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    };
};
  
export default connect(mapStateToProps)(PromptList);