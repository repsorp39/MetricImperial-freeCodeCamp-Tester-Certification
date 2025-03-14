'use strict';
const ConvertHandler = require('../controllers/convertHandler.js');
const express = require("express");
const router = express.Router();

router.get("/",(req, res, next) =>{
  const {  input  } = req.query;
  const conversion = new ConvertHandler(input);
  const output = conversion.getResult();
  res.send(output);
})

module.exports = router;
