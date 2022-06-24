const router = require('express').Router();
const classes = require('./model');

router.get('/', (req, res) => {
    res.send('Hello from wow-classes route');
});

router.post('/', (req, res) => {
    res.send('Hello from wow-classes post route');
});

router.get('/:id', (req, res) => {
    res.send('Hello from wow-classes get by ID route');
});

module.exports = router;