"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
var chienSchema = new mongoose_1["default"].Schema({
    nameChien: { type: String, required: true },
    gender: { type: String, required: true },
    color: { type: String, required: true },
    age: { type: Number, required: true },
    image: { type: String, required: true, "default": new Date() },
    state: { type: Boolean, required: true, "default": false },
    description: { type: String, required: true },
    idchien: { type: Number, required: true, "default": 2 }
});
chienSchema.plugin(mongoose_paginate_1["default"]);
var Chien = mongoose_1["default"].model("Chien", chienSchema);
exports["default"] = Chien;
