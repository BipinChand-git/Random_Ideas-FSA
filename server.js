const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();   //To bring dotenv file and we don't need to use variable to store it.

const port = process.env.PORT || 5000;

const connectDB = require('./config/db');

connectDB();  //invoking the function-

const app = express();

// To make Static Folder-
app.use(express.static(path.join(__dirname, 'public')));

// To send some data, we actually have to add a piece of middleware.
// Body parser middleware-
app.use(express.json());
app.use(express.urlencoded({extended : false}));
// This is something we usually do in all our APIs.

// cors middleware-
app.use(cors({
    origin : ['http://localhost:5000', 'http://localhost:3000'],
    credentials : true
}))


app.get('/', (req, res) => {
    res.send({success : true, message : 'Welcome to the Random Ideas Application.'});
})

const ideasRouter = require('./routes/ideas');
const { connect } = require('mongoose');

app.use('/api/ideas', ideasRouter);
// Middleware, first pass the endpoint and then the file that has to go when we hit this endpoint.

app.listen(port, () => console.log(`Server is listening on port ${port}.`));