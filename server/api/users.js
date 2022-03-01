const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
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
