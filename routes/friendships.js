const express = require('express');
const router = express.Router();
const friendsController = require("../controllers/friendship_controller");

router.post("/toggleFriendship/:id",friendsController.toggleFriendship);


module.exports = router;