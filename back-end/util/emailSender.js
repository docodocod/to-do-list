const nodemailer=require('nodemailer');
const dotenv=require('dotenv');
dotenv.config();

//임시 비밀번호 메일 전송
exports.sendEmail=(to, newPassword)=> {
    const transporter = nodemailer.createTransport({
        service: 'naver',
        auth: {
            user: process.env.nodeMailer_email,
            pass: process.env.nodeMailer_password,
        }
    });

    const mailOptions = {
        from: process.env.nodeMailer_email,
        to: to,
        subject: '임시 비밀번호가 발급되었습니다.',
        text: `임시 비밀번호: ${newPassword}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
};