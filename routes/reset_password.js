const express = require('express');
const router = express.Router();
const resetPasswordController = require("../controllers/reset_password_controller");

router.get("/enter-email",resetPasswordController.enter_email);
router.post("/send_token",resetPasswordController.send_token);
router.get("/reset",resetPasswordController.change_password);
router.post("/new_password",resetPasswordController.new_password);


router.post("/send_token", resetPasswordController.send_token);
module.exports = router;