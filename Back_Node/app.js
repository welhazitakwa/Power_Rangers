
const mongoose = require ('mongoose');
const express = require('express');
const utilisateurRouter = require('./routes/utilisateurs')

const app = express();

mongoose.connect('mongodb://localhost:27017/Power_Rangers',
  { useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected successfully to MongoDB !'))
  .catch(() => console.log('Connection failed to MongoDB !'));

  app.use(express.json());
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

/*
app.get((req,res)=>{
    res.json('Hello World');
})
*/ 
app.use('/utilisateurs', utilisateurRouter);

module.exports = app;