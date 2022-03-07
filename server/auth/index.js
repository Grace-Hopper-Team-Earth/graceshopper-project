const router = require('express').Router()
const { models: {User }} = require('../db')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body)});
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    console.log(">>>>>>>>>>>>>", user)
    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('An account with this email address already exists')
    } else {
      next(err)
    }
  }
})

router.get('/me', async (req, res, next) => {
  try {
    req.user = await User.findByToken(req.headers.authorization)
    if (req.user) {
      const {id, username, password, firstName, lastName, address} = req.user
      res.json({
        id,
        username,
        password,
        firstName,
        lastName,
        address
      })
    }
  } catch (ex) {
    next(ex)
  }
})
