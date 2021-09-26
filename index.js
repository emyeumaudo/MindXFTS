const express = require('express')
const fs = require('fs') 
var bodyPaser = require('body-parser')
const Router = require('./router')
const app = express()



// parse application/x-www-form-urlencoded
app.use(bodyPaser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyPaser.json());


const port = 5000;

app.use(express.static('anh'))

app.use('/', Router);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})