const Utilisateur = require ('./../models/Utilisateur')

exports.all = (req, res) => {
    Utilisateur.find()
      .then(utilisateurs => res.status(200).json(utilisateurs))
      .catch(err => res.status(400).json({error: err.message}));
  };