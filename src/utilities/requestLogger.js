const fs = require('fs');
const path = require('path');

function RequestLogger(req, res, next) {
    const data = new Date().toString() + " " + req.method + " " + req.url + "\n";
    console.log("Request: " + data);
    // const filePath = path.join(__dirname, '../logs/RequestLogger.txt');
    // fs.appendFile(filePath, data, (err) => {
        // if (err) next(err);
    // })

    next();
}

module.exports = RequestLogger;