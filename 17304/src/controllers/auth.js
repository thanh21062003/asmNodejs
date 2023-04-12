import User from '../models/user';
import bcrypt from 'bcryptjs';
import { signinSchema, signupSchema } from '../schemas/auth';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const { error } = signupSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                message: 'Email đã tồn tại',
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Không trả password
        user.password = undefined;
        return res.status(201).json({
            message: 'Đăng ký thành công',
            user,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

// Bước 1: validate giá trị client gửi lên
// Bước 2: Kiểm tra user có tồn tại trong db không? Nếu không có trả về lỗi
// Bước 3: Kiểm tra mật khẩu từ client gửi lên có khớp với mật khẩu db?
// Bước 4: Tạo token mới và trả về client cùng thông tin user

/**
 * Nhìn
 * Hiểu
 * Bonus: Viết từng bước 1
 * Nhớ
 * Code
 * Làm lại
 */

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = signinSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                messages: errors,
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'Tài khoản không tồn tại',
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Mật khẩu không đúng',
            });
        }
        const token = jwt.sign({ id: user._id }, 'banThayThieu', {
            expiresIn: '10d',
        });
        return res.status(200).json({
            message: 'Đăng nhập thành công',
            accessToken: token,
            user,
        });
    } catch (error) {}
};
