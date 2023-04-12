import React from 'react';
import { Button, Checkbox, Divider, Form, Input, message } from 'antd';
import { IUser } from '../types/user';
import { useNavigate } from 'react-router-dom';

interface IProps {
    onAdd: (product: IUser) => void;
}

type Props = {};

const Register = (props: IProps) => {
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        props.onAdd(values);
        navigate('/login');
        message.success('Đăng kí thành công', 2);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, marginTop: 60, marginLeft: 380 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Divider orientation="center">
                <h1>Đăng ký</h1>
            </Divider>

            <Form.Item
                label="Name"
                name="name"
                rules={[
                    { required: true, message: 'Bạn không được bỏ trống!' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Bạn không được bỏ trống email!' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, message: 'Bạn không được bỏ trống password!' },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                    { required: true, message: 'Bạn không được bỏ trống password!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('Không trùng mật khẩu');
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Register;
