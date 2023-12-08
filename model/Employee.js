let mongoose = require('mongoose');
let employeeSchema = new mongoose.Schema({
    name: String, 
    email: String,
    address: String,
    salary:Number,
    phone: String,
});
module.exports = mongoose.model("employee",employeeSchema);