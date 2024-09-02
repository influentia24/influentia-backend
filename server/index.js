require('dotenv').config()
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConnection = require('./utils/db.js');

const port = process.env.PORT
const routes = require('./routes/index.js')
dbConnection();
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
  }));
  
  
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.json());
app.use('/api',routes)
// Routes



//server entry point dev
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});      