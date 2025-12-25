const express = require('express');
const cors = require('cors');
const sequelize = require('./database');

// Models
const Student = require('./models/Student');
const Book = require('./models/Book');
const Settings = require('./models/Settings');
const Transaction = require('./models/Transaction');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/students', require('./routes/students'));
app.use('/api/books', require('./routes/books'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/stats', require('./routes/stats'));

app.get('/', (req, res) => {
    res.send('LMS Backend is Running');
});

// Sync Database and Start Server
const PORT = 5000;
sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to database:', err);
});
