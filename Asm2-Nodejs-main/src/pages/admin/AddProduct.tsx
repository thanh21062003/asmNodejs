import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Select, message } from 'antd';
import { IProduct } from '../../types/product';
import axios from 'axios';
interface IProps {
    onAdd: (product: IProduct) => void;
}
const AddProduct = (props: IProps) => {
    // nhận props từ App.tsx

    const navigate = useNavigate(); // khởi tạo navigate để điều hướng
    // const { register, handleSubmit } = useForm()
    // const onHandleSubmit = (data) => {
    //     props.onAdd(data);
    //     navigate('/admin/products')
    // }
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:8080/api/categories/')
            .then((response) => setCategories(response.data))
            .catch((error) => console.log(error));
    }, []);
    const onFinish = (values: any) => {
        props.onAdd(values);
        navigate('/admin/products');
        message.success('Thêm sản phẩm thành công !', 3);
        console.log(values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            {/* <form action="" onSubmit={handleSubmit(onHandleSubmit)}>
                <input type="text" placeholder='Product Name' {...register('name')} />
                <input type="number" {...register('price')} />
                <button type="submit">Add New Product</button>
            </form> */}
            <h1 style={{ marginTop: 20, marginBottom: 40, marginLeft: 230 }}>
                Create New Products
            </h1>

            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 1000 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Price"
                    hasFeedback
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Product Image"
                    name="image"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Product Desc"
                    name="desc"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name="categoryId"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Select placeholder="Select a category">
                        {categories.map((category: any) => (
                            <Select.Option
                                key={category._id}
                                value={category._id}
                            >
                                {category.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddProduct;
