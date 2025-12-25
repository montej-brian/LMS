const sequelize = require('./database');
const Student = require('./models/Student');
const Book = require('./models/Book');
const Transaction = require('./models/Transaction');
const Settings = require('./models/Settings');

async function test() {
    try {
        console.log('Testing associations...');
        console.log('Student associations:', Object.keys(Student.associations));
        console.log('Book associations:', Object.keys(Book.associations));
        console.log('Transaction associations:', Object.keys(Transaction.associations));

        await sequelize.authenticate();
        console.log('Database connection successful.');
        process.exit(0);
    } catch (error) {
        console.error('Test failed:', error);
        process.exit(1);
    }
}

test();
