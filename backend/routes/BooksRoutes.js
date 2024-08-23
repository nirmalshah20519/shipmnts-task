const BooksController = require("../controllers/BooksController");
const express = require("express");
const fileUpload = require('express-fileupload');
const router = express.Router();
router.use(fileUpload());


router.get("/demo", BooksController.demoApi)
router.post("/parse-excel", BooksController.parseExcel);
router.post("/save", BooksController.saveToDB);
// Order Routs
module.exports = router;