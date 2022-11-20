const express = require('express');
//const Utilisateur = require('../models/Utilisateur');
const utilisateurController = require ('../controllers/utilisateur')
const router = express.Router();

router.get('/',utilisateurController.all);
module.exports = router;
