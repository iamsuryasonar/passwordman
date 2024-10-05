const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
let cors = require('cors')


const authRoute = require('./routes/authentication.js')

// Mongoose options
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 50000,
};

// Connect to the MongoDB server
mongoose.connect(process.env.DB_CONNECT, mongooseOptions)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

// Create a reference to the connection
const db = mongoose.connection;

// Event listeners for connection events
db.on('error', error => {
    console.error('MongoDB connection error:', error);
});
db.once('open', (error) => {
    console.log('MongoDB connection established', error);
});
db.on('disconnected', (error) => {
    console.log('MongoDB disconnected', error);
});

app.use(express.json())

// route middleware
// it adds /api/auth to the route
app.use('/api/auth', authRoute)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})