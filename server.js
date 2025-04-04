const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection with error handling
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Change to your MySQL username
    password: '', // Change to your MySQL password
    database: 'portfolio_db',
    connectTimeout: 10000 // 10 second timeout
});

// Create RESPONSES table
db.connect(err => {
    if (err) {
        console.error('MySQL Connection Error:', err.message);
        console.log('Running in offline mode (comments will not be saved)');
        return;
    }
    console.log('MySQL Connected...');
    
    const createTableSQL = `CREATE TABLE IF NOT EXISTS RESPONSES (
        id INT AUTO_INCREMENT PRIMARY KEY,
        comment TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    
    db.query(createTableSQL, (err) => {
        if (err) throw err;
        console.log('RESPONSES table created');
    });
});

// API endpoint to save comments
app.post('/api/comments', (req, res) => {
    const { comment } = req.body;
    const sql = 'INSERT INTO RESPONSES (comment) VALUES (?)';
    db.query(sql, [comment], (err, result) => {
        if (err) throw err;
        res.send('Comment saved');
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});