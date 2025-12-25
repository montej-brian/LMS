const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Settings = sequelize.define('Settings', {
    penaltyRate: {
        type: DataTypes.FLOAT,
        defaultValue: 5
    },
    loanDuration: {
        type: DataTypes.INTEGER,
        defaultValue: 5
    },
    schoolName: {
        type: DataTypes.STRING,
        defaultValue: 'Mwalimu Library'
    }
});

module.exports = Settings;
