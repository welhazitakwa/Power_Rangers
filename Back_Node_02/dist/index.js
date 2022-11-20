"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var municipalite_model_1 = __importDefault(require("./municipalite.model"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = (0, express_1["default"])();
app.use(body_parser_1["default"].json());
var url = "mongodb://localhost:27017/Power_Rangers";
mongoose_1["default"].connect(url, function (err) {
    if (err)
        console.log(err);
    else
        console.log("Mongo Database connected successfuly");
});
/***************************get************************/
app.get("/municipalites", function (req, resp) {
    municipalite_model_1["default"].find(function (err, municipalites) {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(municipalites);
    });
});
/***************************post***********************/
app.post("/municipalites", function (req, resp) {
    var municipalite = new municipalite_model_1["default"](req.body);
    municipalite.save(function (err) {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(municipalite);
    });
});
/*************************put***************************/
app.put("/municipalites/:id", function (req, resp) {
    var municipalite = municipalite_model_1["default"].findByIdAndUpdate(req.params.id, req.body, function (err) {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(" municipalite update");
    });
});
app.get("/", function (req, resp) {
    resp.send("hello express");
});
app.listen(8090, function () {
    console.log("server started");
});
