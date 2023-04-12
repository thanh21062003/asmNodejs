import axios from "axios";
import Joi from "joi";
import Category from "../models/category";
import Product from "../models/product";
const categorySchema = Joi.object({
    name : Joi.string().required(),
  
});
export const getAll = async(req,res)=>{
    try {
        const id = req.params.id;
        // const { data } = await axios.get(`http://localhost:3002/Categorys/${id}`);
        const data = await Category.find().populate("products");
        if(data.length === 0){
            return res.status(200).json({message : "k có sản phẩm"});
        }return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        }); 
    }
    // const {data} = await axios.get(`http://localhost:3002/Categorys`)
};
export const get = async(req,res)=>{
    try {
        const id = req.params.id;
        // const { data } = await axios.get(`http://localhost:3002/Categorys/${id}`);
        const category = await Category.findOne({_id: id}).populate("products")
        console.log("category: ", category)
        if(category.length === 0){
            return res.status(200).json({message : "k có sản phẩm"});
        }
        return res.status(200).json(category);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        }); 
    }
};
export const create = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const {error} = categorySchema.validate(body);
        if(error){
            return res.json({
                message:error.details.map((item)=>item.message),
            });
        }
        // const { data } = await axios.post(`http://localhost:3002/Categorys`, body);
        const data = await Category.create(body);
        if (data.length === 0) {
            return res.status(400).json({
                message: "Thêm danh mục thất bại",
            });
        }
        return res.status(200).json({
            message: "Thêm danh mục thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const remove = async (req, res) => {
    try {
        // await axios.delete(`http://localhost:3002/Categorys/${req.params.id}`);
        const data = await Category.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa danh mục thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const update = async (req, res) => {
    try {
        // const { data } = await axios.patch(
        //     `http://localhost:3002/Categorys/${req.params.id}`,
        //     req.body
        // );
        const data = await Category.findOneAndUpdate({_id: req.params.id},req.body,{
            new: true,
        })
        if (!data) {
            return res.status(400).json({
                message: "Cập nhật danh mục thất bại",
            });
        }
        return res.json({
            message: "Cập nhật sản phẩm thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};