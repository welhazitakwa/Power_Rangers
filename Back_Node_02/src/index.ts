import  express from "express";
import mongoose from "mongoose";


const app=express();


const url = "mongodb://localhost:27017/Power_Rangers"
mongoose.connect(url,(err)=>{
    if(err)console.log(err)
    else console.log("Mongo Database connected successfuly")
});


app.get("/" , (req,resp)=>{
    resp.send("hello express")
});

app.listen(8090,()=>{
    console.log("server started")
})