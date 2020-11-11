import React from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';

import { Typography } from 'antd';
import { List, Avatar, Divider } from 'antd';

const { Text } = Typography;


const Prompt = (props) => {
    Moment.locale('en');
    return (
        <List
            itemLayout="vertical"
            size="large"
            grid={{gutter: 12, column: 3}}
            pagination={{
            onChange: page => {
                console.log(page);
            },
            pageSize: 12,
            }}
            dataSource={props.data}
            renderItem={item => (
            <List.Item
                key={item.id}
                actions={[
                    <a href={`/detail/${item.id}`} key="list-loadmore-more">detail</a>
                ]}
            >
                <Divider />
                <List.Item.Meta
                    title={item.title}
                    avatar={<Avatar src={item.creater.profile.avatar} />}
                />
                <p>{item.description}</p>
                <p>{item.place}</p>
                <p>{Moment(item.create_date_time).format('MMMM Do, YYYY H:mma')}</p>
                <p>{Moment(item.done_date_time).format('MMMM Do, YYYY H:mma')}</p>
                {
                    item.complited ?
                        <Text type="success">Complited</Text>
                    :
                        <Text type="danger">Not complited</Text>
                }
            </List.Item>
            )}
        />
    )
}

const mapStateToProps = state => {
    return {
        token: state.token,
        user_id: state.user_id
    };
};
  
export default connect(mapStateToProps)(Prompt);