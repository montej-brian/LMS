const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// Get all settings (should be only one row)
router.get('/', async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({});
        }
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update settings
router.post('/', async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create(req.body);
        } else {
            await settings.update(req.body);
        }
        res.json(settings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
