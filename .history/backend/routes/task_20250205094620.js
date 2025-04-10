const express = require("express");
const { createForm, getForms, getFormById, updateForm, deleteForm } = require("../controller/formcontroller");
const validateToken = require("../middleware/validateToken");

const router = express.Router();


router.post("/submit",validateToken,createForm)
router.get('/getall', validateToken,getForms)
router.get('/get-all-form/:id', validateToken, getFormById)
router.put('/form-update/:id', validateToken, updateForm)
router.delete('/delete-form/:id', validateToken, deleteForm)




module.exports = router;