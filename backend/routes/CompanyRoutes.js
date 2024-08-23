const CompanyController = require("../controllers/CompanyController");
const express = require("express");
const fileUpload = require('express-fileupload');
const router = express.Router();
router.use(fileUpload());


router.get("/demo", CompanyController.demoApi)
router.post("/parse-excel", CompanyController.parseExcel);
router.post("/save", CompanyController.saveToDB);
// Order Routs
module.exports = router;
