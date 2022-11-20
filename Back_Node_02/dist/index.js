"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var app = (0, express_1["default"])();
var url = "mongodb://localhost:27017/Power_Rangers";
mongoose_1["default"].connect(url, function (err) {
    if (err)
        console.log(err);
    else
        console.log("Mongo Database connected successfuly");
});
app.get("/", function (req, resp) {
    resp.send("hello express");
});
app.listen(8090, function () {
    console.log("server started");
});
