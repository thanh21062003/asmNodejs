// const products = [
//     { id: 1, name: "Iphone 12", price: 2000 },
//     { id: 2, name: "Iphone 11000", price: 1000 },
// ];

// const http = require("http");
// const server =http.createServer((req,res)=>{
//     // console.log("req",req);
//     const products = [
//         {name:"ip 12",price:1280},
//         {name:"ip 10",price:1280}
//     ];
//     products.push(
//         {name:"ip 15",price:10080}
//     )
//     if(req.url=="/products"){
//         res.setHeader("Content-Type","application/json")
//         res.end(JSON.stringify(products));
//     }else if(req.url=="/"){
//         res.setHeader("Content-Type","text/html");
//         res.end(`<html><body><h1>Home Page</h1></body></html>`)
//     }
// })
// server.listen(8080,()=>{
//     console.log("Server is running on port 8080");
// })

import express from 'express';
import cors from 'cors';
import productRouter from './routes/product';
import categoryRouter from './routes/category';
import authRouter from './routes/auth';
import mongoose from 'mongoose';
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', productRouter);
app.use('/api', categoryRouter);
app.use('/api', authRouter);
// mongoose.connect("mongodb://localhost:27017/we17303")
mongoose
    .connect('mongodb://127.0.0.1:27017/WE17304')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB', err));
export const viteNodeApp = app;
