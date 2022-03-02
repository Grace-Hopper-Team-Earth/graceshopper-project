const Sequelize = require('sequelize');
const db = require('../db');

const Tea = db.define('tea', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    price: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'https://st2.depositphotos.com/15146240/48329/v/380/depositphotos_483299434-stock-illustration-cute-hippopotamus-drinking-boba-milk.jpg?forcejpeg=true'
    }
})

module.exports = Tea;
