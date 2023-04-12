import axios from "axios";
import Joi from "joi";
import Product from "../models/product";
import Category from "../models/category";
const productSchema = Joi.object({
    id: Joi.number(),
    name : Joi.string().required(),
    price : Joi.number().required(),
    desc : Joi.string(),
    image: Joi.string(),
    categoryId : Joi.string(),
});
export const getAll = async(req,res)=>{
    const { _limit = 20, _sort = "createAt",_order = "asc",_page = 1} = req.query;
    const options = {
        page : _page,
        limit : _limit,
        sort: {
            [_sort]:_order == "desc" ? -1 : 1,
        },
    };

    try {
        const data = await Product.paginate({}, options);

        if (data.length == 0) {
            return res.json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.json(data);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const get = async(req,res)=>{
    try {
        const id = req.params.id;
        // const { data } = await axios.get(`http://localhost:3002/products/${id}`);
        const data = await Product.findOne({_id: id}).populate("categoryId","-__v");
        if(data.length === 0){
            return res.status(200).json({message : "k có sản phẩm"});
        }return res.status(200).json(data);
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
        const {error} = productSchema.validate(body);
        if(error){
            return res.json({
                message:error.details[0].message,
            });
        }
        // const { data } = await axios.post(`http://localhost:3002/products`, body);
        const product = await Product.create(body);
        await Category.findByIdAndUpdate(product.categoryId,{
            $addToSet:{
                products : product._id,
            },
        })
        
        if (product.length === 0) {
            return res.status(400).json({
                message: "Thêm sản phẩm thất bại",
            });
        }
        return res.status(200).json({
            message: "Thêm sản phẩm thành công",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const remove = async (req, res) => {
    try {
        // await axios.delete(`http://localhost:3002/products/${req.params.id}`);
        const data = await Product.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa sản phẩm thành công",
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
        const data = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        if (!data) {
            return res.status(400).json({
                message: "Cập nhật sản phẩm thất bại",
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


// Computed Property Name

// const myName = "name";
// const myInfo = {
//     [myName]: "Ddat",
// };
// console.log(myInfo.name);