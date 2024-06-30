require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConnection = require('./utils/db.js');
const port = process.env.PORT
const routes = require('./routes/index.js')
dbConnection();

app.use(cors());
app.use(bodyParser.json());
app.use('/api',routes)



//server entry point dev
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});      