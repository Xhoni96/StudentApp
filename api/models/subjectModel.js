const mongoose = require("mongoose");

const subjectsSchema = new mongoose.Schema({
	subject: {
		type: String,
		required: [true, "Subjects cannot be empty"],
	},
	generalInfo: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},

	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: [true, "Review must belong to a tour"],
	},
});

subjectsSchema.pre(/^find/, function (next) {
	this.populate({
		path: "user",
		select: "name",
	}) /* .populate({ path: "tour", select: "name" }). */;
	next();
});

const Subjects = mongoose.model("Subject", subjectsSchema);

module.exports = Subjects;
