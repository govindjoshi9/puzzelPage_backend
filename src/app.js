const cors = require('cors');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const webhook = require('./routes/webhook');

require('dotenv').config();

const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);

const allowedOrigins = ['http://localhost:5173', 'https://puzzle-app-frontend.vercel.app'];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use('/webhook', webhook);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

(async () => {
    try {
        server.listen(PORT, () => { console.log("Server started at port " + PORT); });
    } catch (error) {
        console.error("Failed to connect to the database:", error.message);
    }
})();