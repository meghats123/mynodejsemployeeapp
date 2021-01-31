const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
    empname:{type:String},
    address:{type:String},
    phoneno:{type:Number},
    designation:{type:String},
    email:{type:String},
    salary:{type:Number},
    companyname:{type:String},
    empcode:{type:Number}

});
var empModel=mongoose.model('employees',employeeSchema);
module.exports={empModel}