const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.deleteOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.findByIdAndDelete(req.params.id);

		if (!doc) {
			return next(new AppError("No document found with that ID", 404));
		}

		res.status(204).end();
	});

exports.getAll = (Model) =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.find({}); /* .populate("subjects"); */

		res.status(200).json({
			status: "success",
			results: doc.length,
			data: doc,
		});
	});

exports.createOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.create(req.body);
		res.status(201).json({
			status: "success",
			createdData: doc,
		});
	});

exports.updateOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.status(200).json({
			status: "success",
			updatedData: doc,
		});
	});
