"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
var utilisateurSchema = new mongoose_1["default"].Schema({
    nomUtilisateur: { type: String, required: true },
    prenomUtilisateur: { type: String, required: true },
    ncinUtilisateur: { type: Number, required: true },
    mailUtilisateur: { type: String, required: true }
});
utilisateurSchema.plugin(mongoose_paginate_1["default"]);
var Utilisateur = mongoose_1["default"].model("Utilisateur", utilisateurSchema);
exports["default"] = Utilisateur;
