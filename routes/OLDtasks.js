const express = require('express');
const router = express.Router();

let tasks = [
        {
            id: 0,
            name: 'Upgrade BFM to SP5',
            description: 'Vendredi 18/07/25, upgrade BFM vers le SP5',
            isCompleted: true,
            isNew: false,
            targetDate: new Date(),
            creationDate: new Date()
        },
        {   
            id: 1,
            name: 'Workshops BNR',
            description: 'Revue intégrale des détails des spécifications et signature',
            isCompleted: true,
            isNew: false,
            targetDate: new Date(),
            creationDate: new Date()
        },
        {
            id: 2,
            name: 'Bug Amberfin TF1 Kiosk',
            description: 'Se connecter avec la R&D Amberfin pour investiguer le bug ligne 58 sur Amberfin Kiosk ingest',
            isCompleted: false,
            isNew: true,
            targetDate: new Date(),
            creationDate: new Date()
        },
        {   
            id: 3,
            name: 'Suivi upgrade BFM',
            description: 'Être présent sur site Samedi 19-07 entre 6h00 et 14h00',
            isCompleted: false,
            isNew: false,
            targetDate: new Date(),
            creationDate: new Date()
        },
    ];



    
router.get('/', (req, res) => res.json(tasks));
router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id === +req.params.id);
  task ? res.json(task) : res.status(404).json({ message: 'Tâche non trouvée' });
});

router.post('/', (req, res) => {
  const newTask = { id: Date.now(), ...req.body };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put('/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === +req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Tâche non trouvée' });
  tasks[index] = { ...tasks[index], ...req.body };
  res.json(tasks[index]);
});

router.delete('/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === +req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Tâche non trouvée' });
  tasks.splice(index, 1);
  res.status(204).send();
});


module.exports = router;