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
/************************get id*************************/
app.get("/municipalites/:id", function (req, resp) {
    municipalite_model_1["default"].findById(req.params.id, function (err, municipalite) {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(municipalite);
    });
});
/***********************delete*************************/
app["delete"]("/municipalites/:id", function (req, resp) {
    municipalite_model_1["default"].findByIdAndDelete(req.params.id, function (err) {
        if (err)
            resp.status(500).send(err);
        else
            resp.send("Municipalite deleted");
    });
});
/****************************page***********************/
app.get("/municipalitesParPage", function (req, res) {
    var _a, _b;
    var page = parseInt(((_a = req.query.page) === null || _a === void 0 ? void 0 : _a.toString()) || '1');
    var size = parseInt(((_b = req.query.size) === null || _b === void 0 ? void 0 : _b.toString()) || '5');
    municipalite_model_1["default"].paginate({}, { page: page, limit: size }, function (err, municipalites) {
        if (err)
            res.status(500).send(err);
        else
            res.send(municipalites);
    });
});
/********************************search******************/
app.get("/municipalitesSearch", function (req, res) {
    var _a, _b;
    var search = req.query.search || '';
    var page = parseInt(((_a = req.query.page) === null || _a === void 0 ? void 0 : _a.toString()) || '1');
    var size = parseInt(((_b = req.query.size) === null || _b === void 0 ? void 0 : _b.toString()) || '5');
    municipalite_model_1["default"].paginate({ title: { $regex: ".*(?i)" + search + ".*" } }, { page: page, limit: size }, function (err, municipalites) {
        if (err)
            res.status(500).send(err);
        else
            res.send(municipalites);
    });
});
app.get("/", function (req, resp) {
    resp.send("hello express");
});
app.listen(8090, function () {
    console.log("server started");
});
