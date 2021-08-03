const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const signToken = (id) =>
	jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

const createSendToken = (user, statusCode, res) => {
	const token = signToken(user._id);
	const cookieOptions = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
		),
		// secure: true, // only in https
		httpOnly: true, // cant be accessed by the browser
	};
	if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
	res.cookie("jwt", token, cookieOptions);

	user.password = undefined;

	res.status(statusCode).json({
		status: "success",
		token,
		data: { user },
	});
};

exports.signup = catchAsync(async (req, res) => {
	const newUser = await User.create({
		name: req.body.name,
		surname: req.body.surname,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
		nid: req.body.nid,
	});

	// creating the token that user stores in it's browser
	createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
	const { nid, password } = req.body;

	// 1) check if nid and passw exists
	if (!nid || !password) {
		return next(new AppError("Please provide nid and password", 400));
	}
	// 2) check if user exists && passw is correct
	const user = await User.findOne({ nid }).select("+password"); // use select since we dont show the passw to te user in userModel

	// 3) if everything ok, send token to client
	if (!user || !(await user.comparePassword(password, user.password)))
		return next(new AppError("Incorrect nid or pasword", 401));
	createSendToken(user, 200, res);
});

// 👇 it's called  in order to protect data from unauthorized users by checking if they're logged in
exports.protectData = catchAsync(async (req, res, next) => {
	// 1) Get token and check if it's there
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	}

	if (!token) {
		return next(
			new AppError("You are not logged in! Please log in to get access.", 401)
		);
	}
	//2) Verify token if someone altered the payload
	// use promisify to return a promise so we can use await and keep the same style with promises as in other functions
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	// 3) check if user trying to access the route still exists
	const currentUser = await User.findById(decoded.id);
	if (!currentUser)
		return next(
			new AppError("The user belonging to the token does no longer exist", 401)
		);

	// 4) Check if user changed password after the token was issued

	if (currentUser.isPasswordChanged(decoded.iat))
		return next(
			new AppError("User recently changed password! Please log in again", 401)
		);

	req.user = currentUser;

	// 👇 GRANT acces to protected route
	next();
});
