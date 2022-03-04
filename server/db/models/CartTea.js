const Sequelize = require('sequelize');
const db = require('../db');

const CartTea = db.define('carttea', {
  itemQty: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = CartTea;
