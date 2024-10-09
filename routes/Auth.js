
const express = require("express");
const { signup } = require("../controllers/Auth");

const router = express.Router();

router.post("/signup" , signup)

module.exports = router;