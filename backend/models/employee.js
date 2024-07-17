const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    match: /^[A-Za-z\s]+$/
  },
  age: Number,
  email: {
    type: String,
    required: true,
    match: /^\S+@\S+\.\S+$/
  },
  dateOfBirth: Date,
  address: String,
  photo: String // URL or base64 encoded string
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
