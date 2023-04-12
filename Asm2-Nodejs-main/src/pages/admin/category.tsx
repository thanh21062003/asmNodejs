import { Space, Table, Button, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { IProduct } from '../../types/product';
import Title from 'antd/es/typography/Title';
// interface IProduct{
//   id:number,
//     name:string,
//     price:number,
// }
// interface IProps {
//   onAdd:(products:IProduct) => void
// }
interface IProps {
    products: IProduct[];
    onRemove: (id: number) => void;
}
interface DataType {
    key: string | number;
    _id: number;
    name: string;
    price: number;
    image: string;
    desc: string;
    categoryId: string | number;
}
interface IProps {
    products: IProduct[];
    onRemove: (_id: number) => void;
}
const categoryManagement = (props: IProps) => {
    

    const columns: ColumnsType<DataType> = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Images',
            dataIndex: 'image',
            key: 'image',
            render: (text) => (
                <img src={text} alt="product" style={{ maxWidth: '100px' }} />
            ),
        },
        {
            title: 'Desc',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: 'Catrgory',
            dataIndex: 'categoryId',
            key: 'categoryId',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        style={{ backgroundColor: 'red' }}
                        onClick={() => removeProduct(record._id)}
                    >
                        Remove
                    </Button>
                    <Button type="primary">
                        <Link to={`/admin/products/${record._id}/update`}>
                            Update
                        </Link>
                    </Button>
                </Space>
            ),
        },
    ];

    const data: IProduct[] = props.products.map((item: IProduct) => {
        return {
            key: item._id,
            ...item,
        };
    });

    return (
        <div>
            <Title level={2} style={{ color: 'Red', textAlign: 'center' }}>
                Products
            </Title>
            <Button style={{ margin: 20, textAlign: 'center' }} type="primary">
                <Link to={'/admin/products/add'}>Add New Product</Link>
            </Button>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default categoryManagement;