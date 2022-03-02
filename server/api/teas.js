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
