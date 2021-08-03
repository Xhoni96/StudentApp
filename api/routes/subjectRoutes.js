const express = require("express");
const subjectController = require("../controllers/subjectController");

const router = express.Router();

router
	.route("/")
	.get(subjectController.getAllSubjects)
	.post(subjectController.createSubject);

module.exports = router;
