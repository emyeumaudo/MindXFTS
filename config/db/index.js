const mongoose = require('mongoose');


async function connect () {
try{
    await mongoose.connect('mongodb://localhost:27017/users_student_dev', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('Connect success');

   } catch(error) {
       console.log('Connect faill');

   }

}

module.exports = { connect }