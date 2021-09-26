const express = require('express')
var jwt = require('jsonwebtoken');


let loginRouter = express.Router();
const private_key = 'sdfsdfd';


const loginController = (req, res) => {
    const {user_name ='', password = ''} = body;

    if (user_name == 'quang vinh' && password === 'Aa123456') {
        var token = jwt.sign({ user_name }, private_key);
        return {
            status: 200,
            data: {
                token,
                user_name
            }
        }
    } else {
        return {
            status: 400,
            data: {
                token,
                msg: "Kiem tra lai ten dang nhap"
            }
        }
    }   
};




loginRouter.post('/', async (req, res) => {
    try {
    const body = req.body;
    console.log('body', body);
    const result = await loginController(body)
    res.status(result.status).json(result.data)

    console.log(result)

    } catch (err) {
        res.status(500).json(err)
    }
    
});

module.exports = loginRouter;