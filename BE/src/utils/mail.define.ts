const nodemailer = require('nodemailer');
export const mailDefine = async () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'nguyenvancuong19032002@gmail.com', // generated ethereal user
            pass: process.env.PASSMAIL,
        },
    });
    return transporter;
};
