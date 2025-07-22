const express = require('express');
const router = express.Router();

let users = [
  { id: 0, login: 'admin', password: 'admin' },
  { id: 1, login: 'mdu', password: 'mdu'}
];
router.get('/auth', (req, res) => {
  const { login, password } = req.query;
  console.log('Tentative de login avec :', login, password);
  const user = users.find(u => u.login === login && u.password === password);
  user ? res.json(user) : res.status(401).json({ message: 'Identifiants invalides' });
});
router.get('/', (req, res) => res.json(users));
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === +req.params.id);
  user ? res.json(user) : res.status(404).json({ message: 'Utilisateur non trouvé' });
});


module.exports = router;