const express = require('express');
var jwt = require('jsonwebtoken');

const userRouter = require('./user');
const loginRouter = require('./login')
const app = express();
const private_key = 'sdfsdfd';

const middleware = (req, res, next) => {
try {
 // verify a token symmetric - synchronous
    var decoded = jwt.verify(token, private_key);
    console.log(decoded.foo) // bar
    // req.real_name = "vinh"
    // console.log('req');
    next();
} catch (err) {
res.status(403).json({
    msg: "token sai"
})
}
}

 
app.use('/user', middleware, userRouter)
// app.use('/product', middleware, userRouter)
app.use('/login', loginRouter)

module.exports = app