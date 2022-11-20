"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
var municipaliteSchema = new mongoose_1["default"].Schema({
    nameMunicipalite: { type: String, required: true },
    localisationMunicipalite: { type: String, required: true }
});
municipaliteSchema.plugin(mongoose_paginate_1["default"]);
var Municipalite = mongoose_1["default"].model("Municipalite", municipaliteSchema);
exports["default"] = Municipalite;
