import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IProduct } from '../../types/product';
import { Button, Form, Input, Select, message } from 'antd';
import axios from 'axios';

interface Iprops {
    products: IProduct[];
    onUpdate: (_id: number) => void;
    id: IProduct[];
}

const UpdateProductPage = (props: IProduct) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [product, setProducts] = useState<IProduct>();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/categories')
            .then(({ data }) => {
                setCategories(data);
            })
            .catch((error) => {
                // console.log(error);
            });

        fetch(`http://localhost:8080/api/products/${id}`)
            .then((response) => response.json())
            .then((data) => {
                const data1 = {
                    name: data.name,
                    desc: data.desc,
                    price: data.price,
                    image: data.image,
                    categoryId: data.categoryId._id,
                };
                form.setFieldsValue(data1);
            });
    }, [props]);

    const onFinish = (values: Iprops) => {
        const data = { _id: id, ...values };
        props.onUpdate(data);
        navigate('/admin/products');
        message.success('Cập nhật sản phẩm thành công!', 2);
    };

    return (
        <div>
            <Form form={form} style={{ maxWidth: 600 }} onFinish={onFinish}>
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
                    label="Product Price"
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
                <Form.Item label="Image" name="image">
                    <Input />
                </Form.Item>

                <Form.Item label="Description" name="desc">
                    <Input />
                </Form.Item>

                <Form.Item label="Category" name="categoryId">
                    <Select>
                        {categories.map((category: IProduct) => (
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
                        Update Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateProductPage;
