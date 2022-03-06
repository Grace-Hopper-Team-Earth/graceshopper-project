const router = require('express').Router();
const { models: { Tea, User }} = require('../db');
module.exports = router;

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await User.findByToken(req.headers.authorization);
    next();
  } catch (err) {
    next(err)
  }
}

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    res.status(403).send("Oops... Admin Only!")
  } else {
    next();
  }
}

// GET /api/adminteas (serves up all teas with editing capability - ADMIN only)
router.get('/', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const teas = await Tea.findAll();
    res.json(teas);
  } catch (err) {
    next(err);
  }
})
