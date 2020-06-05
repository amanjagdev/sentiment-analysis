const express = require("express");
const router = express.Router();

/*
    @route:     /api/analyse/
    @desc:      To analyse whether the given sentence is possitive or not
*/
router.get('/',(req,res) => {
    res.send("Analysed");
});



module.exports = router;