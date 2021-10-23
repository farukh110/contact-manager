const express = require("express");
const connectDB = require('../config/db');

const app = express();

// Connect to MongoDB

connectDB();

// Middleware

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ page:  'Home Page' }) );

// define routes

app.use('/api/users', require('./routes/users/users'));
app.use('/api/auth', require('./routes/auth/auth'));
app.use('/api/contacts', require('./routes/contacts/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`localhost:${PORT}`);
});