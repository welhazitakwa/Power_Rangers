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



/************************get id*************************/


app.get("/municipalites/:id",(req:Request,resp:Response)=>{
    Municipalite.findById(req.params.id,(err:any,municipalite:any)=>{
        if(err) resp.status(500).send(err)
        else resp.send(municipalite);

    })
});

/***********************delete*************************/

app.delete("/municipalites/:id",(req:Request,resp:Response)=>{
    Municipalite.findByIdAndDelete(req.params.id,(err:any)=>{
        if(err) resp.status(500).send(err)
        else resp.send("Municipalite deleted")
    })
});


/****************************page***********************/


app.get("/municipalitesParPage",(req:Request,res:Response)=>{
    const page:number = parseInt(req.query.page?.toString()||'1');
    const size:number = parseInt(req.query.size?.toString()||'5');

    Municipalite.paginate({},{page:page,limit:size},(err:any,municipalites:any)=>{
        if(err) res.status(500).send(err);
        else res.send(municipalites);
    });

});


/********************************search******************/

app.get("/municipalitesSearch",(req:Request,res:Response)=>{
    const search = req.query.search || '';
    const page:number = parseInt(req.query.page?.toString()||'1');
    const size:number = parseInt(req.query.size?.toString()||'5');

    Municipalite.paginate({title:{$regex:".*(?i)"+search+".*"}},{page:page,limit:size},(err:any,municipalites:any)=>{
        if(err) res.status(500).send(err);
        else res.send(municipalites);
    });
    
});





app.get("/" , (req,resp)=>{
    resp.send("hello express")
});

app.listen(8090,()=>{
    console.log("server started")
})