import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate"
let utilisateurSchema = new mongoose.Schema({
    nomUtilisateur : {type : String , required : true},
    prenomUtilisateur : {type : String , required : true},
    ncinUtilisateur : {type : Number , required : true},
    mailUtilisateur : {type : String , required : true},
    
});
utilisateurSchema.plugin(mongoosePaginate)
const Utilisateur = mongoose.model("Utilisateur",utilisateurSchema)
export default Utilisateur;