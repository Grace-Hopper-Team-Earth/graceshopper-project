const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  numberOfItems: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  subTotal: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  checkedOut: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
})

module.exports = Cart;