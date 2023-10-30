const express= require('express');
const router= express.Router();
const {handleCreateUser} = require('../controllers/user');


router.route("/")
.post(handleCreateUser);

module.exports=router;