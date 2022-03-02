//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Tea = require('./models/Tea')
const Cart = require('./models/Cart')

//associations could go here!
User.hasOne(Cart)
Cart.belongsTo(User)

Cart.belongsToMany(Tea, {through: 'cart_tea'})
Tea.belongsToMany(Cart, {through: 'cart_tea'})

module.exports = {
  db,
  models: {
    User,
    Tea, 
    Cart
  },
}
