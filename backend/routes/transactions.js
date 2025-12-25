const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Book = require('../models/Book');
const Student = require('../models/Student');
const Settings = require('../models/Settings');

// Get all transactions (with student and book info)
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.findAll({
            include: [Student, Book],
            order: [['createdAt', 'DESC']]
        });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Borrow a book
router.post('/borrow', async (req, res) => {
    const { studentAdmission, bookId, borrowDate, dueDate } = req.body;
    try {
        const student = await Student.findOne({ where: { admissionNumber: studentAdmission } });
        if (!student) return res.status(404).json({ message: 'Student not found' });

        // Check if student already has a borrowed book
        const activeLoan = await Transaction.findOne({
            where: { StudentId: student.id, status: 'Borrowed' }
        });
        if (activeLoan) return res.status(400).json({ message: 'Student already has a pending book to return.' });

        const book = await Book.findByPk(bookId);
        if (!book || book.status !== 'Available') return res.status(400).json({ message: 'Book is not available.' });

        const transaction = await Transaction.create({
            borrowDate,
            dueDate,
            status: 'Borrowed',
            StudentId: student.id,
            BookId: book.id
        });

        await book.update({ status: 'Borrowed' });
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Return a book
router.post('/return', async (req, res) => {
    const { transactionId, returnDate, penalty, condition } = req.body;
    try {
        const transaction = await Transaction.findByPk(transactionId);
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

        await transaction.update({
            returnDate,
            penalty,
            condition,
            status: 'Returned'
        });

        const book = await Book.findByPk(transaction.BookId);
        if (book) {
            // If lost, status remains 'Lost' or update to it
            await book.update({ status: condition === 'Lost' ? 'Lost' : 'Available' });
        }

        res.json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
