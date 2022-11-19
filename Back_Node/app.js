const express = require('express');

const app = express();

app.use((req,res)=>{
    res.json('Hello World');
})

module.exports = app;