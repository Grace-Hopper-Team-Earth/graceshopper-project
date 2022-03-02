const router = require('express').Router();
const { models: { Tea }} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await Tea.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
})

// GET /api/teas/:id
router.get('/:id', async (req, res, next) => {
  try {
    const tea = await Tea.findByPk(req.params.id);
    if(!tea) {
      let err = new Error('Umm...we can\'t find what you\'re looking for.');
      err.status = 404;
      next(err);
    } else {
      res.send(tea);
    }
  } catch (err) {
    next(err);
  }
})
