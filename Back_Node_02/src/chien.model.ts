import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate"

let chienSchema = new mongoose.Schema({
    nameChien : {type:String , required:true},
    gender : {type:String , required:true},
    color:{type:String, required:true},
    age:{type:Number, required:true},
    image:{type:String, required:true, default:new Date()},
    state:{type:Boolean, required:true,default: false},
    description : {type:String , required:true},
    idchien : {type:Number, required:true,default: 4}
    });

    chienSchema.plugin(mongoosePaginate)
    const Chien = mongoose.model("Chien",chienSchema)
    export default Chien;