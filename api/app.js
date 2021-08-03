const cors = require("cors");
const express = require("express");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const userRouter = require("./routes/userRoutes");
// const subjectRouter = require("./routes/subjectRoutes");

const app = express();

app.use(express.json({ limit: "10kb" })); // limiting the body amount of request
app.use(cors());

app.use("/api/v1/users", userRouter);
// app.use("/api/v1/subjects", subjectRouter);

app.all("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

module.exports = app;
