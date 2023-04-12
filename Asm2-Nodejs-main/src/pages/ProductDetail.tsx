import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IProduct } from '../types/product';
import { getOneProduct } from '../api/product';
import { Col, Divider, Row } from 'antd';
interface IProps {
    products: IProduct[];
    _id: number | string;
}
const ProductDetail = (_id: IProps) => {
    const { id } = useParams();
    const [products, setProduct] = useState<IProduct[]>([]);
    useEffect(() => {
        getOneProduct(id)
            .then((response) => {
                setProduct(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);
    if (!products) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <Divider orientation="center">
                <h1>Products</h1>
            </Divider>

            <Row>
                <Col span={12}>
                    {' '}
                    <div>
                        <img src={products.image} alt="" />
                    </div>
                </Col>
                <Col span={12}>
                    <div>Tên sản phẩm : {products.name}</div>
                    <div> Giá sản phẩm : {products.price}</div>{' '}
                    <div> Mô tả sản phẩm : {products.desc}</div>
                </Col>
            </Row>
        </div>
    );
};

export default ProductDetail;
