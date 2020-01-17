const express = require("express");

const router = express.Router();

const Action = require("../helpers/actionModel");

router.get("/actions", (req,res) => {
    Action.get()
})

module.exports = router;
