import {createRequire} from 'module'

const require = createRequire(import.meta.url);
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
import {expressjwt} from 'express-jwt'
import router from './src/routes/routes.js'
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const app = express();
const connectionString = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;
app.use(cors());

mongoose.connect(connectionString);
mongoose.connection.once('open', () => {
    app.emit('ready');
})

mongoose.Promise = global.Promise;
// view engine setup
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.use(function(req, response, next) {
//     response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//     response.setHeader("Access-Control-Allow-Credentials", "true");
//     response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//     next();
// });
app.use(expressjwt({secret: process.env.JWT_SECRET, algorithms: ['HS256']}).unless({
    path: ['/api/user/auth', '/api/user/register']
}));

// api routes
app.use('/api/', router);

// global error handler
// app.use(logErrors);
// app.use(errorHandler);

// start server
app.on('ready', () => {
    app.listen(PORT, function () {
        console.log('Server listening on port ' + PORT);
    });
})


// module.exports = app;
