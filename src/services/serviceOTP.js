const axios = require('axios');
const nodemailer = require('nodemailer');
const modelOtp = require('../model/modelOtp');
const validator = require('../utilities/validator');

const jwt = require('../utilities/jwt');
const serviceUser = require('./serviceUser');

const throwError = require('../utilities/throwError');
const statusCode = require('../utilities/statusCodes');
const messagesManager = require('../utilities/messagesManager');

const { emailContent } = require('../utilities/emailContent');
require('dotenv').config();

function GenerateOTP(length) {
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
}

async function SendMail(email, otp, type) {
    const { subject, body } = emailContent(otp, type);

    try {
        const res = await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: { name: "Govind", email: process.env.EMAIL },
                to: [{ email }],
                subject: subject,
                htmlContent: body
            },
            {
                headers: {
                    "api-key": process.env.BREVO_API_KEY,
                    "Content-Type": "application/json"
                }
            }
        );
        return messagesManager.Success("otpSent");
    } catch (err) {
        console.error("Brevo error:", err.response?.data || err.message);
        throw throwError(messagesManager.Error("otpSent"), statusCode.SERVICE_UNAVAILABLE);
    }
}

async function GetOtp(email, type) {
    validator.Email(email);
    const otp = GenerateOTP(6);
    await modelOtp.SetOtp(email, otp)
    return await SendMail(email, otp, type);
}

async function VerifyOtp(email, otp) {
    validator.Email(email);
    validator.OTP(otp);

    const otpObj = await modelOtp.VerifyOtp(email, otp)

    if (!otpObj) throwError(messagesManager.Error('otpEmailNotFound'), statusCode.NOT_FOUND);

    const createdTime = new Date(otpObj.created_at);
    const now = new Date();
    const diffInMinutes = (now - createdTime) / 1000 / 60;

    if (diffInMinutes > 5) throwError(messagesManager.Error('otpExpire'), statusCode.BAD_REQUEST);
    if (otpObj.otp !== otp) throwError(messagesManager.Error('otpWrong'), statusCode.BAD_REQUEST);

    const user = await serviceUser.GetOrCreateUserByEmail(email);
    const token = jwt.GenerateToken(user);

    return { user, token }
}

module.exports = { GetOtp, VerifyOtp };