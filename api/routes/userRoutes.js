const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();
router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.route("/").get(userController.getAllUsers);
router
	.route("/:id")
	.delete(userController.deleteUser)
	.put(userController.updateUser);

module.exports = router;
