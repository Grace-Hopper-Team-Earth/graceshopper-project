const router = require('express').Router()
const { models: { User, Cart }} = require('../db')
module.exports = router

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
    res.status(403).send("Oops...Admin Only!")
  } else {
    next();
  }
}

// GET /api/users (serves up all users - ADMIN only)
router.get('/', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'firstName', 'lastName', 'address', 'isAdmin']
    })
    res.json(users)
  
  } catch (err) {
    next(err)
  }
})

// GET /api/users/:id (serves up single user - either ADMIN only or logged in user)
router.get('/:id', isLoggedIn, async (req, res, next) => {
  try {
    if (parseInt(req.params.id) === req.user.dataValues.id || req.user.dataValues.isAdmin === true) {
        const singleUser = await User.findByPk(req.params.id, {
        include: [Cart]
      })
      res.json(singleUser)
    } else {
      const error = Error("Oops...this isn't you!");
      error.status = 403
      throw error
    }
  } catch(err) {
    next(err)
  }
})

