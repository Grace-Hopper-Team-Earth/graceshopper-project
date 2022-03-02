const router = require('express').Router()
const { models: { User, Cart }} = require('../db')
module.exports = router

// GET /api/users (serves up all users - ADMIN only)
router.get('/', async (req, res, next) => {
  try {
    // REVISIT WHEN MAKING ADMIN PERMISSIONS (only admin can see users list)
    // const { isAdmin } = await User.findByToken(req.headers.authorization);
    // console.log(req.headers)
    // if (isAdmin !== true) {
    //   console.log('this did not work');
    // }

    const users = await User.findAll({
      attributes: ['id', 'username']
    })
    res.json(users)
  
  } catch (err) {
    next(err)
  }
})

// GET /api/users/:id (serves up single user - either ADMIN only or logged in user)
router.get('/:id', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.id, {
      include: [Cart]
    })
    res.json(singleUser)
  } catch(err) {
    next(err)
  }
})