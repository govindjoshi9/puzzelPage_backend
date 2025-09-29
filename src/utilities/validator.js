const errorThrow = require('./throwError');
const statusCode = require('../utilities/statusCodes');
const messagesManager = require('../utilities/messagesManager');

function Email(email) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errorThrow(messagesManager.Error('emailInvalid'), statusCode.BAD_REQUEST);
}

function OTP(otp) {
    if (!/^\d{6}$/.test(String(otp))) errorThrow(messagesManager.Error('otpInvalid'), statusCode.BAD_REQUEST);
}

function Username(username) {
    if (username.length < 2) errorThrow(messagesManager.Error('userNameLess'), statusCode.BAD_REQUEST);
    if (username.length > 20) errorThrow(messagesManager.Error('userNameLarge'), statusCode.BAD_REQUEST);
}

function URL(url) {
    const pattern = /^(https?:\/\/)?([a-z\d-]+\.)+[a-z]{2,6}(:\d{1,5})?(\/.*)?$/i;
    if (!pattern.test(url)) errorThrow(messagesManager.Error('urlInvalid'), statusCode.BAD_REQUEST);
}

function About(about) {
    if (about.length < 5) errorThrow(messagesManager.Error('aboutLess'), statusCode.BAD_REQUEST);
    else if (about.length > 1000) errorThrow(messagesManager.Error('aboutLarge'), statusCode.BAD_REQUEST);
}

module.exports = { Email, OTP, Username, About, URL }