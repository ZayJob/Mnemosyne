import React from 'react';
import axios from "axios";
import { connect } from 'react-redux';

import { Form, Input, Button, Select, DatePicker } from 'antd';


const config = {
    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};

class UpdatePromptForm extends React.Component {
    state = {
        selectedItems: [],
    }

    handleChange = selectedItems => {
      this.setState({ selectedItems });
    };

    handleFormSubmit = (event) => {
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const place = document.getElementById('place').value;
      const done_date_time = document.getElementById('done_date_time').value;
      const added_users_name = this.state.selectedItems;

      axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: "Token " + this.props.token
      }
      axios.get('http://0.0.0.0:8000/auth/users/me/')
          .then(response => {
              axios.defaults.headers = {
                  "Content-Type": "application/json",
                  Authorization: "Token " + this.props.token
              }
              axios.patch(`http://0.0.0.0:8000/api/v1/prompts/${this.props.promptID}/`, {
                  creater_id: response.data.id,
                  title: title,
                  description: description,
                  place: place,
                  done_date_time: done_date_time,
                  added_users_name: added_users_name
              })
              .then(response => {window.location.reload(false)})
              .catch(error => {console.log(error)});
          });
    };

    render() {
        const { selectedItems } = this.state;
        const filteredOptions = this.props.users.filter(o => !selectedItems.includes(o));
        return (
            <Form>
              <Form.Item label='Title'>
                <Input id='title' name='title'/>
              </Form.Item>
              <Form.Item label='Description'>
              <Input.TextArea id='description' name='description'/>
              </Form.Item>
              <Form.Item label='Place'>
                <Input id='place' name='place'/>
              </Form.Item>
              <Form.Item label="Done DateTime" {...config}>
                <DatePicker id='done_date_time' name='done_date_time' showTime format='YYYY-MM-DD HH:mm'/>
              </Form.Item>
              <Form.Item label='Added users'>
                <Select
                    mode="multiple"
                    placeholder="Inserted are removed"
                    value={selectedItems}
                    onChange={this.handleChange}
                    style={{ width: '100%' }}
                    name='added_users'
                    id='added_users'
                >
                    {filteredOptions.map(item => (
                    <Select.Option key={item} value={item} target-data={item}>
                        {item}
                    </Select.Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button onClick={(event) => this.handleFormSubmit(
                    event,
                    this.props.promptID
                )} type="primary" htmlType="submit">{this.props.btnText}</Button>
              </Form.Item>
            </Form>
        );
    }
}

const mapStateToProps = state => {
  return {
      token: state.token
  };
};

export default connect(mapStateToProps)(UpdatePromptForm);