const mongoose = require ('mongoose');
const utilisateurSchema = new mongoose.Schema({
    idUtilisateur : {type : Number , required : true},
    nomUtilisateur : {type : String , required : true},
    prenomUtilisateur : {type : String , required : true},
    ncinUtilisateur : {type : Number , required : true},
    mailUtilisateur : {type : String , required : true},
   
})

module.exports= mongoose.model('Utilisateur',utilisateurSchema);