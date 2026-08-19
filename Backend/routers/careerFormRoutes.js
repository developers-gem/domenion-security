const express = require("express")
const router = express.Router();

const {createCareerForm,deleteCareerForm} = require("../controllers/careerFormController");


// creater career form route
router.post("/careerform",createCareerForm);

// delete career form route

router.delete("/deletecareerform/:id",deleteCareerForm);


module.exports = router