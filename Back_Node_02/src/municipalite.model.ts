import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate"
let municipaliteSchema = new mongoose.Schema({
    nameMunicipalite : {type : String , required : true},
    localisationMunicipalite : {type : String , required : true},
});
municipaliteSchema.plugin(mongoosePaginate)
const Municipalite = mongoose.model("Municipalite",municipaliteSchema)
export default Municipalite;