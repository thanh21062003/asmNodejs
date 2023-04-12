import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Col, Divider, Row } from 'antd';
import { IProduct } from '../types/product';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const style: React.CSSProperties = { padding: '8px 0' };

interface IProps {
    products: IProduct[];
}

const HomePage = (props: IProps) => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get('http://localhost:8080/api/products')
            .then((response) => {
                setProducts(response.data.docs);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const handleGetone = (product: IProduct) => {
        navigate(`/products/${product._id}`);
    };
    return (
        <>
            <Divider orientation="center">
                <h1>Products</h1>
            </Divider>
            <Row gutter={16}>
                {products.map((product) => (
                    <Col className="gutter-row" span={6} key={product._id}>
                        <div
                            onClick={() => {
                                handleGetone(product);
                            }}
                            style={{ textAlign: 'center' }}
                        >
                            <img
                                style={{ width: 200 }}
                                src={product.image}
                                alt=""
                            ></img>
                            <h3>{product.name}</h3>
                        </div>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default HomePage;
