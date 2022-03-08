const router = require('express').Router();
const {
  models: { Tea, User },
} = require('../db');
module.exports = router;

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await User.findByToken(req.headers.authorization);
    next();
  } catch (err) {
    next(err);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    res.status(403).send('Oops... Admin Only!');
  } else {
    next();
  }
};

// GET /api/adminteas (serves up all teas with editing capability - ADMIN only)
router.get('/', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const teas = await Tea.findAll();
    res.json(teas);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/adminteas
router.delete('/:id', async (req, res, next) => {
  try {
    const tea = await Tea.findByPk(req.params.id);
    await tea.destroy();
    res.send(tea);
  } catch (error) {
    next(error);
  }
});

// UPDATE/PUT /api/adminteas/:id
router.put('/:id', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const teaToUpdate = await Tea.findByPk(req.params.id);
    res.send(await teaToUpdate.update(req.body));
  } catch (err) {
    next(err);
  }
});
