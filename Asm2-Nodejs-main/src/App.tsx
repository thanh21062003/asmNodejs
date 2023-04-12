import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import ProductManagement from './pages/admin/ProductManagement';
import UpdateProductPage from './pages/admin/UpdateProduct';
import Dashboard from './pages/admin/Dashboard';
import AddProduct from './pages/admin/AddProduct';
import {
    addProduct,
    deleteProduct,
    getAllProduct,
    getOneProduct,
    updateProduct,
} from './api/product';
import WebsiteLayout from './pages/layouts/WebsiteLayout';
import AdminLayout from './pages/layouts/AdminLayout';
import { IProduct } from './types/product';

import Login from './pages/Login';
import Register from './pages/Register';
import { IUser } from './types/user';
import { register } from './api/auth';
function App() {
    const [products, setProduct] = useState<IProduct[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);
    useEffect(() => {
        getAllProduct().then(({ data }) => setProduct(data.docs));
    }, []);
    // const onHandleGet = (id:number)=>{
    //   getOneProduct(id).then(()=>setProduct(products))
    // }
    const onHandleRemove = (id: number) => {
        deleteProduct(id).then(() =>
            setProduct(products.filter((item: IProduct) => item._id !== id)),
        );
    };
    const onHandleAdd = (product: IProduct) => {
        addProduct(product).then(() => {
            const data = [...products, product];
            setProduct(data);
        });
    };
    const onRegister = (user: IUser) => {
        register(user).then(() => {
            const data = [...users, user];
            setUsers(data);
        });
    };

    const onHandleUpdate = (product: IProduct) => {
        updateProduct(product).then(() =>
            getAllProduct().then(({ data }) => {
                setProduct(data.docs);
            }),
        );
    };

    // console.log("product", products)
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<WebsiteLayout />}>
                    <Route index element={<HomePage products={products} />} />
                    <Route path="products">
                        <Route
                            path=":id"
                            element={
                                <ProductDetail products={products} _id={''} />
                            }
                        />
                    </Route>

                    <Route path="login" element={<Login />} />
                    <Route
                        path="register"
                        element={<Register onAdd={onRegister} />}
                    />
                </Route>

                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="products">
                        <Route
                            index
                            element={
                                <ProductManagement
                                    products={products}
                                    onRemove={onHandleRemove}
                                />
                            }
                        />
                        <Route
                            path="add"
                            element={<AddProduct onAdd={onHandleAdd} />}
                        />
                        <Route
                            path=":id/update"
                            element={
                                <UpdateProductPage
                                    products={products}
                                    onUpdate={onHandleUpdate}
                                />
                            }
                        />
                    </Route>
                    <Route path="category">
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
