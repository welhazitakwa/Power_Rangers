const Utilisateur = require ('./../models/Utilisateur')

exports.all = (req, res) => {
    Utilisateur.find()
      .then(utilisateurs => res.status(200).json(utilisateurs))
      .catch(err => res.status(400).json({error: err.message}));
  };

  
  exports.create = (req, res, next) => {
    const utilisateur = new Utilisateur(
        req.body
    )
    utilisateur.save()
      .then(() => res.status(201).json({ message: 'User created  !'}))
      .catch(error => res.status(400).json({ error }));
  };