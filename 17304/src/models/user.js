import mongoose from 'mongoose';

const useSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type:String,
        default:"member",
    },
});

export default mongoose.model('User', useSchema);
