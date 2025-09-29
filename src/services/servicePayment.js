const throwError = require('../utilities/throwError');
const statusCode = require('../utilities/statusCodes');
const messagesManager = require('../utilities/messagesManager');

const stripeOBJ = require('stripe');
require('dotenv').config();

const stripe = stripeOBJ(process.env.STRIPE_SECRET_KEY);
const FRONTEND = process.env.FRONTEND;

async function Payment(priceId, userId) {
    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                }
            ],
            success_url: `${FRONTEND}/paymentsuccess`,
            cancel_url: `${FRONTEND}/paymentfail`,
            metadata: { userId }
        });

        return { url: session.url };
    } catch (error) {
        console.error(error);
        throw throwError(messagesManager.Error('paymentFail'), statusCode.INTERNAL_SERVER_ERROR);
    }
}

module.exports = { Payment };