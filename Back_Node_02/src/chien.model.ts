import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate"

let chienSchema = new mongoose.Schema({
    gender : {type:String , required:true},
    color:{type:String, required:true},
    age:{type:Number, required:true},
    image:{type:String, required:true, default:new Date()},
    state:{type:Boolean, required:true,default: true},
    description : {type:String , required:true},
    
    });

    chienSchema.plugin(mongoosePaginate)
    const Chien = mongoose.model("Chien",chienSchema)
    export default Chien;