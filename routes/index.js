const express = require("express");
const router = express.Router();
// we are accessing a controller  
const homeController = require("../controllers/home_controller");

// we are accessing a controller's action throught the router
router.get("/",homeController.home);

router.use("/users",require("./users"));
//  for any further routes access from here
// router.use("/router_name",require("./router_filename")) 
console.log("Router is up and running");





module.exports = router;