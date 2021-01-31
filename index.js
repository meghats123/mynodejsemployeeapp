const express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
var {empModel}=require("./model/emp")
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect("mongodb+srv://megha:test123@cluster0.crp2x.mongodb.net/bookdb?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true});
app.post('/empadd',async(req,res)=>{
    try{
        var data = req.body;
       var empData=new empModel(data);
       var result=await empData.save();
       res.json(result);

    }
    catch(error){
        res.status(500).send(error)

    }

})
app.listen(process.env.PORT || 3000,function(){
    console.log('Your node js server is running at http://localhost:3000')
})