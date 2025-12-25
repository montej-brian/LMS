const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Student = sequelize.define('Student', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admissionNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    form: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stream: {
        type: DataTypes.STRING,
        allowNull: false
    },
    points: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = Student;
