//libs
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//instantiating  express 
const app = express();

//using the libs
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', require('./routes/routes'));

//conecting to the database
mongoose.connect('mongodb://localhost/notes',{useNewUrlParser: true,  useUnifiedTopology: true });

//running the server
app.listen(3000);
console.log('Server is running');