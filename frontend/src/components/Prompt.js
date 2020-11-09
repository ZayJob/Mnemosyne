import React from 'react';
import Moment from 'moment';

import { List, Avatar, Divider } from 'antd';


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
            </List.Item>
            )}
        />
    )
}

export default Prompt;