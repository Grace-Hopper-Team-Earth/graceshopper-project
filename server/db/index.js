//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Tea = require('./models/Tea');
const Cart = require('./models/Cart');
const CartTea = require('./models/CartTea');

//associations could go here!
User.hasMany(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Tea, { through: CartTea });
Tea.belongsToMany(Cart, { through: CartTea });

Cart.hasMany(CartTea);

module.exports = {
  db,
  models: {
    User,
    Tea,
    Cart,
    CartTea,
  },
};
