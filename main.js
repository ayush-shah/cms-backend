//Declaring Variables
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const mongoose = require('mongoose');
const product = require("./Routes/productRoute")

//Connecting to Database
mongoose.connect(process.env.DB_LINK, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected")
});
app.use(cors())
app.use(express.json())
app.use('/product',product);
app.listen(3000)