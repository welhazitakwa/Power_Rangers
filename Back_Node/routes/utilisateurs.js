const express = require('express');
//const Utilisateur = require('../models/Utilisateur');
//const utilisateurController = require ('../controllers/utilisateur')
const router = express.Router();
const utilisateurController = require ('../controllers/utilisateur')

router.get('/',utilisateurController.all);
router.post('/',utilisateurController.create);
module.exports = router;
