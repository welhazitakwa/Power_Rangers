import  express, {Request,Response} from "express";
import Municipalite from "./municipalite.model";
import mongoose from "mongoose";
import bodyParser from "body-parser"


const app=express();
app.use(bodyParser.json())


const url = "mongodb://localhost:27017/Power_Rangers"
mongoose.connect(url,(err)=>{
    if(err)console.log(err)
    else console.log("Mongo Database connected successfuly")
});


/***************************get************************/

app.get("/municipalites",(req:Request,resp:Response)=>{
    Municipalite.find((err,municipalites)=>{
        if (err) resp.status(500).send(err);
        else resp.send(municipalites);

    })

});

/***************************post***********************/

app.post("/municipalites",(req:Request,resp:Response)=>{
    let municipalite = new Municipalite(req.body)
    municipalite.save(err=>{
        if(err) resp.status(500).send(err)
        else resp.send(municipalite)
    })

});



/*************************put***************************/

app.put("/municipalites/:id",(req:Request,resp:Response)=>{
    let municipalite = Municipalite.findByIdAndUpdate(req.params.id,req.body,(err:any)=>{
        if(err) resp.status(500).send(err)
        else resp.send(" municipalite update")
    })
});



app.get("/" , (req,resp)=>{
    resp.send("hello express")
});

app.listen(8090,()=>{
    console.log("server started")
})