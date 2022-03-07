const router = require('express').Router();
const {
  models: { Tea, User },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await Tea.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET /api/tea/:id
router.get('/:id', async (req, res, next) => {
  try {
    const tea = await Tea.findByPk(req.params.id);
    if (!tea) {
      let err = new Error("Umm...we can't find what you're looking for.");
      err.status = 404;
      next(err);
    } else {
      res.send(tea);
    }
  } catch (err) {
    next(err);
  }
});

// POST /api/teas/add
// find wheater the user is admin or not, if is not admin, throw the error message
// if the user is admin, then he/she can create a new Tea
router.post('/add', async (req, res, next) => {
  try {
    const { isAdmin } = await User.findByToken(req.headers.authorization);
    if (isAdmin === false) {
      let err = new Error('need authorization to add new product');
      err.status = 401;
      throw err;
    }
    const newTea = await Tea.create(req.body);
    res.json(newTea);
  } catch (err) {
    next(err);
  }
});
