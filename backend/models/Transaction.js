const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Student = require('./Student');
const Book = require('./Book');

const Transaction = sequelize.define('Transaction', {
    borrowDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    returnDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    penalty: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    condition: {
        type: DataTypes.STRING,
        defaultValue: 'Good'
    },
    status: {
        type: DataTypes.ENUM('Borrowed', 'Returned'),
        defaultValue: 'Borrowed'
    }
});

Transaction.belongsTo(Student);
Transaction.belongsTo(Book);

module.exports = Transaction;
