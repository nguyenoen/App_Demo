const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config({ path: '/configs/config.env' });

// Init App
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

// Listen

const PORT = 8080 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.yellow.bold);
});