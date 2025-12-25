const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Student = require('../models/Student');
const Transaction = require('../models/Transaction');
const sequelize = require('../database');
const { Op } = require('sequelize');

router.get('/summary', async (req, res) => {
    try {
        const totalBooks = await Book.count();
        const totalStudents = await Student.count();
        const borrowedBooks = await Book.count({ where: { status: 'Borrowed' } });
        const overdueBooks = await Transaction.count({
            where: {
                status: 'Borrowed',
                dueDate: { [Op.lt]: new Date().toISOString().split('T')[0] }
            }
        });

        const lostBooks = await Book.count({ where: { status: 'Lost' } });
        const returnedBooks = await Transaction.count({ where: { status: 'Returned' } });

        res.json({
            totalBooks,
            totalStudents,
            borrowedBooks,
            overdueBooks,
            lostBooks,
            returnedBooks
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/trends', async (req, res) => {
    try {
        // 1. Weekly Data (last 7 days)
        const weeklyData = await Transaction.findAll({
            attributes: [
                [sequelize.fn('strftime', '%w', sequelize.col('borrowDate')), 'day'],
                [sequelize.fn('count', sequelize.col('id')), 'count']
            ],
            where: { status: 'Borrowed' },
            group: ['day']
        });

        // 2. Subject Popularity (Treemap)
        const subjects = await Transaction.findAll({
            include: [{ model: Book, attributes: ['subject'] }],
            attributes: [
                [sequelize.fn('count', sequelize.col('Transaction.id')), 'size']
            ],
            group: ['Book.subject']
        });

        const subjectTreeMap = subjects.map(s => ({
            name: s.Book?.subject || 'Other',
            size: s.dataValues.size
        }));

        res.json({
            weekly: weeklyData,
            subjects: subjectTreeMap
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
