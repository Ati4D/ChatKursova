import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, List, Form, Input, Row, Col } from 'antd';
import {
    SendOutlined
} from '@ant-design/icons';
import axios from 'axios';
import AuthentificatedContext from '../../../contexts/AuthentificatedContext';

const Chat = ({ selectedGroup, selected }) => {

    const { user } = useContext(AuthentificatedContext);
    const [messages, setMessages] = useState([]);
    const form = useRef();

    const getDataFromAPI = async (id) => {
        try {
            const response = await axios.get('api/messages/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setMessages(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    const sendDataToAPI = async (userId, groupId, data) => {
        try {
            const response = await axios.post('api/messages', [userId + "", groupId + '', data + ''], {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    useEffect(() => {
        getDataFromAPI(selectedGroup.id);
    }, [selectedGroup]);



    const onFinish = async (values) => {
        console.log('Success:', values);
        await sendDataToAPI(user.id, selectedGroup.id, values.text);
        await getDataFromAPI(selectedGroup.id);
        form.current?.resetFields();
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <h2>{selectedGroup.name}</h2>
            <List
                style={{ height: '79vh', borderRadius: 0, overflow: 'auto' }}
                size="small"
                bordered
                dataSource={messages}
                renderItem={(item, index) =>
                    <List.Item>
                        {<div style={ item.userId === user.id ?{textAlign: 'right', width: '100%'}:{textAlign: 'left', width:'100%'}}>{item.text}</div>}
                    </List.Item>}
            />
            {
                selected !== -1 ?
                    <Form
                        ref={form}
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        style={{ display: 'flex' }}
                    >


                        <Form.Item
                            name="text"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{ display: 'flex', flexDirection: 'row' }}
                        >
                            <Input  style={{borderRadius: 0}}/>
                        </Form.Item>
                        <Form.Item>
                            <Button style={{borderRadius: 0}} type="primary" htmlType="submit">
                                <SendOutlined />
                            </Button>
                        </Form.Item>

                    </Form> :
                    <></>
            }

        </div>
    );
}

export default Chat;
