import mongoose from 'mongoose';
import Category from './category';
import mongoosePaginate from "mongoose-paginate-v2";
import { string } from 'joi';
const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    price:{
        type: Number,
        require: true,
    },
    image:{
        type: String,
        require: true,
    },
    desc: {
        type: String,
        require: true,
    },

    categoryId:{
        type: mongoose.Types.ObjectId,
        ref : "Category"
    }
},{timestamps: true, versionKey: false});
productSchema.plugin(mongoosePaginate);
export default mongoose.model('Product', productSchema);
