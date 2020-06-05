const express = require("express");
const cors = require("cors");

//Initialising Application
const app = express();

//PORT
const port =  process.env.PORT || 5000;

//Fixing Cors
app.use(cors());


/*
    @route: /
    @desc: Home Route
*/
app.get('/',(req,res) => {
    res.send("Welcome to sentiment analysis")
});

//Server Setup
app.listen(port, () => {
    console.log(`Server started at ${port}`)
})

