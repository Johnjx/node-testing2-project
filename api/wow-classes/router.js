const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello from wow-classes route');
});

module.exports = router;