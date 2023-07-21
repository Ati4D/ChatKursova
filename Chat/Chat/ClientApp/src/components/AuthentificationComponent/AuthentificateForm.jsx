import {
    Button,
    Form,
    Input,
    Select,
    Modal
} from 'antd';
import React, { useContext, useState } from 'react';
import './style.css';
import axios from 'axios';
import Password from 'antd/es/input/Password';
import AuthentificatedContext from '../../contexts/AuthentificatedContext';
import { redirect, useNavigate } from 'react-router-dom';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const AuthentificateForm = ({ startType }) => {

    const [open, setOpen] = useState(true);
    const [type, setType] = useState(startType ?? 'reg');
    const { setUser } = useContext(AuthentificatedContext);
    const [form] = Form.useForm();
    let navigate = useNavigate();

    const sendDataToAPI = async (data) => {
        try {
            const response = await axios.post('api/authentification', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
            if (type === 'reg')
                alert("This User Exists(email & telephone)");
            return error;
        }
    };
    const getDataFromAPI = async (string) => {
        try {
            const response = await axios.get('api/authentification/' + string, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            if (response.data) {
                setUser({
                    id: response.data.id,
                    firstname: response.data.firstName,
                    lastname: response.data.lastName,
                    password: response.data.password,
                    email: response.data.email,
                    phone: response.data.phoneNumber,
                    regdate: response.data.registrationDate
                });
            }
        } catch (error) {
            console.error(error);
            if (type === 'log')
                alert("Error entering data");
            return error;
        }
    };


    const onFinish = async (values) => {
        console.log("Finished!");
        let s, g;
        try {
            s = await sendDataToAPI(type === 'reg' ? [values.firstname, values.lastname, values.password, values.phone, values.email] : [values.firstname, values.email, values.password]);
            g = await getDataFromAPI(values.firstname + '|' + values.email + '|' + values.password);
        } catch (error) {
            alert("Some Error");
        }
        if (s == null || g == null)
        {
            setOpen(false);
            return navigate('/home');
        }
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="38">+38</Option>
            </Select>
        </Form.Item>
    );

    return (
        <>
            <Modal
                title={type === 'reg' ? "Registration form" : "Sign in form"}
                centered
                open={open}
                onCancel={() => { }}
                width='fit-context'
                height='fit-context'
                footer
                closeIcon={null}
            >
                <div className='centered'>
                    <img src="https://d26a57ydsghvgx.cloudfront.net/content/blog/BlogImage_Chat.jpg" alt="https://d26a57ydsghvgx.cloudfront.net/content/blog/BlogImage_Chat.jpg" />
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        initialValues={{
                            prefix: '+38',
                        }}
                        style={{
                            maxWidth: 700,
                            width: 'fit-content',
                            margin: 'auto'
                        }}
                        scrollToFirstError method='post'>


                        <Form.Item
                            name="firstname"
                            label="Firstname"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your firstname!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        {type === 'reg' ?
                            <Form.Item
                                name="lastname"
                                label="Lastname"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your lastname!',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            : <></>}
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    min: 6,
                                    max: 255,
                                    message: 'Min length - 6, max - 255',
                                }
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        {type === 'reg' ?
                            <Form.Item
                                name="confirm"
                                label="Confirm Password"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The new password that you entered do not match!'));
                                        },
                                    }),
                                ]}

                            >
                                <Input.Password />
                            </Form.Item>
                            : <></>}

                        {type === 'reg' ?
                            <Form.Item
                                name="phone"
                                label="Phone Number"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your phone number!',
                                    },
                                    {
                                        len: 10,
                                        message: 'Incorrect phone number'
                                    }
                                ]}
                            >
                                <Input
                                    addonBefore={prefixSelector}
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </Form.Item>
                            : <></>}

                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: 'fit-context', margin: '5px' }}>
                                {type === 'log' ? "Sign in" : "Register"}
                            </Button>
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button
                                type='ghost'
                                htmlType='button'
                                style={{ width: 'fit-context', margin: '5px' }}
                                onClick={() => { setType(type === 'reg' ? 'log' : 'reg') }}>
                                {type === 'log' ? "Register" : "Sign in"}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>

    );
}

export default AuthentificateForm;