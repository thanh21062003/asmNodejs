import joi from "joi";

export const signupSchema = joi.object({
    name: joi.string().required().messages({
        "string.empty":"Tên không được để trống",
        "any.required":"Trường Tên là bắt buộc",
    }),
    email: joi.string().email().required().messages({
        "string.empty":"Email không được để trống",
        "any.required":"Trường Email là bắt buộc",
        "string.email":"Email không đúng định dạng",
    }),
    password: joi.string().min(6).required().messages({
        "string.empty":"Password không được để trống",
        "any.required":"Trường Password là bắt buộc",
        "string.min":"Mật khẩu phải có ít nhất {#limit} ký tự",
    }),
    confirmPassword: joi.string().valid(joi.ref("password")).required().messages({
        "string.empty":"ConfirmPassword không được để trống",
        "any.required":"Trường ConfirmPassword là bắt buộc",
        "any.only":"Mật khẩu không khớp",
    }),
});

export const signinSchema = joi.object({

    email: joi.string().email().required().messages({
        "string.empty":"Email không được để trống",
        "any.required":"Trường Email là bắt buộc",
        "string.email":"Email không đúng định dạng",
    }),
    password: joi.string().min(6).required().messages({
        "string.empty":"Password không được để trống",
        "any.required":"Trường Password là bắt buộc",
        "string.min":"Mật khẩu phải có ít nhất {#limit} ký tự",
    }),

});