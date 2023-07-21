import React, { useContext, useState, useEffect, useMemo } from 'react';
import AuthentificatedContext from '../../../contexts/AuthentificatedContext';
import axios from 'axios';
import { Avatar, List, Row, Col } from 'antd';
import Chat from '../ChatPart/Chat';
import Users from '../UsersPart/Users';
import '../style.css';
import Group from './Group';

const sendDataToAPI = async (data) => {
    try {
        const response = await axios.post('api/chats', data, {
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


//avatar
//creationDate
//creatorUserId
//description
//id
//name
//type



const Groups = () => {

    const { user } = useContext(AuthentificatedContext);
    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState([]);
    const [selected, setSelected] = useState(-1);
    const [selectedGroup, setSelectedGroup] = useState({});
    console.log(user);
    useEffect(() => { getGroups(user.id + ""); }, [user]);
    useEffect(() => { getUsers(selectedGroup.id ?? -1); }, [selected]);
    useEffect(() => { getFriends(); }, [selected])


    const getGroups = async (id) => {
        try {
            const response = await axios.get('api/chats/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            await setGroups(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
            return error;
        }
    };
    const getUsers = async (id) => {
        try {
            const response = await axios.get('api/chats/users/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setUsers(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
            return error;
        }
    };
    const getFriends = async () => {
        try {
            const response = await axios.get('api/users', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setFriends(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
            return error;
        }
    };


    return (
        <Row style={{width: '100vw'}}>
            <Col>
                <List wrapperCol={{ span: 24 }}
                    style={{ height: '90vh', overflow: 'auto', borderRadius: 0 }}
                    size="small"
                    header={<div>Header</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={groups}
                    renderItem={(item, index) => <List.Item>
                        <button onClick={() => { 
                            setSelected(index); 
                            setSelectedGroup(item);
                             getUsers(selectedGroup.id ?? -1);}
                             }><Group group={item} selected={index === selected} /></button>
                    </List.Item>}
                /></Col>
            <Col><Chat selectedGroup={selectedGroup} selected={selected} /></Col>
            <Col span={10}><Users selectedGroup={selectedGroup} selected={selected} users={users} friends={friends} /></Col>
        </Row>
    );
}

export default Groups;
