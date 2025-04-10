const express = require("express");
const { addTask, viewTasks, deleteTask } = require("../controller/taskController");
const validateToken = require("../middleware/validateToken");

const router = express.Router();


router.post("/addtasks",validateToken,addTask)
router.get('/gettask', validateToken,viewTasks)
router.delete('/delete-task/:id', validateToken, deleteTask)




module.exports = router;