const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const User = require('./User');

const address = db.define('address',{
    street:{
        type: DataTypes.STRING,
        required: true
    },
    Number:{
        type: DataTypes.STRING,
        required: true
    },
    city:{
        type: DataTypes.STRING,
        required: true
    }
});

address.belongsTo(User);


module.exports = address;