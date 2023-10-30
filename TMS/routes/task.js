const express= require('express');
const router= express.Router();
const {handleGetTasks,handleCreateTask,handleUpdateTask,handleDeleteTask} = require('../controllers/task');

router.route("/")
.get(handleGetTasks)
.post(handleCreateTask)
.patch(handleUpdateTask)
.delete(handleDeleteTask)


module.exports=router;