const mongoose = require("mongoose");

require("dotenv").config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE.replace(
	"<PASSWORD>",
	process.env.DATABASE_PASSWORD
);

mongoose
	.connect(DB, {
		// these are standard methods
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	// eslint-disable-next-line no-console
	.then(() => console.log("DB connection successful!"))
	// eslint-disable-next-line no-console
	.catch((err) => console.log("💥", err));

const port = process.env.PORT || 3000;
// eslint-disable-next-line no-console
const server = app.listen(port, () =>
	console.log(`App running on port ${port}`)
);
// GLOBAL Unhandled rejection. Kind of like a safety net
process.on("unhandledrejection", (err) => {
	// eslint-disable-next-line no-console
	console.log("Unhandled rejection..SHUTING DOWN");
	// eslint-disable-next-line no-console
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});
