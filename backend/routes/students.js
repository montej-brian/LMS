const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.findAll({
            order: [['points', 'DESC']]
        });
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new student
router.post('/', async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
