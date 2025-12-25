const sequelize = require('./database');
const Student = require('./models/Student');
const Book = require('./models/Book');
const Settings = require('./models/Settings');
const Transaction = require('./models/Transaction');

const seed = async () => {
    try {
        await sequelize.sync({ force: true }); // Clear db

        // Settings
        await Settings.create({
            penaltyRate: 5,
            loanDuration: 5,
            schoolName: 'Mwalimu Library'
        });

        // Students
        const student1 = await Student.create({
            name: 'Brian Chacha',
            admissionNumber: 'S2020/001',
            form: 'Form 4',
            stream: 'East',
            points: 120
        });

        const student2 = await Student.create({
            name: 'Jane Doe',
            admissionNumber: 'S2021/055',
            form: 'Form 3',
            stream: 'West',
            points: 45
        });

        // Books
        const book1 = await Book.create({ title: 'The Alchemist', author: 'Paulo Coelho', subject: 'Literature', status: 'Borrowed' });
        const book2 = await Book.create({ title: 'Atomic Habits', author: 'James Clear', subject: 'Self-Help', status: 'Borrowed' });
        const book3 = await Book.create({ title: 'Physics Form 4', author: 'KLB', subject: 'Science', status: 'Available' });
        const book4 = await Book.create({ title: 'Biology Form 3', author: 'KLB', subject: 'Science', status: 'Available' });
        const book5 = await Book.create({ title: 'Mathematics Form 1', author: 'KLB', subject: 'Mathematics', status: 'Available' });

        // Transactions
        // 1. Brian borrowed The Alchemist (Due soon)
        await Transaction.create({
            borrowDate: '2023-10-20',
            dueDate: '2023-10-25',
            status: 'Borrowed',
            StudentId: student1.id,
            BookId: book1.id
        });

        // 2. Jane borrowed Atomic Habits (Overdue)
        await Transaction.create({
            borrowDate: '2023-10-01',
            dueDate: '2023-10-06',
            status: 'Borrowed',
            StudentId: student2.id,
            BookId: book2.id
        });

        console.log('Database Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seed();
