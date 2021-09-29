const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Course = new Schema({
    id: { type: Number},
    name: { type: String},
    age: { type: Number},
    gender: { type: String},
    department: { type: String},
  });

module.exports = mongoose.model('Course', Course);
