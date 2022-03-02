const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
//I noticed that one of our routes/files is singular and the other is plural, which may be confusing. Can we change this mounted route to 'teas' instead?
//-Jessica
router.use('/tea', require('./tea'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
