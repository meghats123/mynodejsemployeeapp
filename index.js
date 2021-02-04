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
app.get("/viewall",async(req,res)=>{
    try{
        var result=await empModel.find().exec();
        res.json(result);
    }
    catch(error){
        res.status(500).send(error)
    }
})
app.post("/search",async(req,res)=>{
    try{
        empModel.find(req.body,(error,data)=>{
            if(error){
                throw error;
            }
            else{
                res.json(data)
            }
        })
    }
    catch(error){
        res.status(500).send(error)
    }
})
app.post("/delete",async(req,res)=>{
    try{
        empModel.findByIdAndDelete(req.body.id,(error,data)=>{
            if(error){
                res.send(error)
            }
            else{
                res.json({'status':'success'})
            }
            
        })
    }
    catch(error){
        res.status(500).send(error)
    }
})
app.post("/update",async(req,res)=>{
    try{
        empModel.findByIdAndUpdate(req.body.id,
            {
                empname:req.body.empname,
                address:req.body.address,
                phoneno:req.body.phoneno,
                designation:req.body.designation,
                email:req.body.email,
                salary:req.body.salary,
                companyname:req.body.companyname,
                empcode:req.body.empcode,

            },(error,data)=>{
                if(error){
                    throw error
                }
                else{
                    res.json({'status':'success'})
                    
                }
            }
            )

    }
    catch(error){
        res.status(500).send(error)
    }
    
})
app.listen(process.env.PORT || 3000,function(){
    console.log('Your node js server is running at http://localhost:3000')
})