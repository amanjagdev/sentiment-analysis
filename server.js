const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

//Initialising Application
const app = express();

//PORT
const port =  process.env.PORT || 5000;

//Fixing Cors
app.use(cors());

// BODY PARSER MIDDLEWARE IN USE
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//Importing Apis
const analysisApi = require("./api/analysis");
 
app.use('/api/analyse',analysisApi);

//Client Setup
app.use('/css',express.static(__dirname + '/public/css'))
app.use('/js',express.static(__dirname + '/public/js'))
app.get('/',(req,res) => {
    res.sendFile(__dirname+'/public/index.html');
});

//Server Setup
app.listen(port, () => {
    console.log(`Server started at ${port}`)
})

