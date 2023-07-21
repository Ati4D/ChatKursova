import React, { memo } from 'react';
import { Button, List, Form, Input, Row, Col } from 'antd';

const Users = ({selectedGroup, selected, users, friends}) => {
    return (
        <>
            <List
                style={{ height: '45vh', borderRadius: 0, overflow: 'auto' }}
                size="small"
                header={<h2>Users in chat</h2>}
                bordered
                dataSource={users}
                renderItem={(item, index) =>
                    <List.Item>
                        {item.firstName+item.lastName}
                    </List.Item>}
            />
             <List
                style={{ height: '45vh', borderRadius: 0, overflow: 'auto' }}
                size="small"
                header={<h2>Friends</h2>}
                bordered
                dataSource={friends}
                renderItem={(item, index) =>
                    <List.Item>
                        {item.firstName+item.lastName}
                    </List.Item>}
            />
        </>
    );
}

export default memo(Users, (prev, next)=>{ return prev.users === next.users});
