const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	__v: {
		type: Number,
		select: false,
	},
	nid: {
		type: String,
		required: [true, "Studenti duhet te kete nje NID"],
		unique: true,
	},
	name: {
		type: String,
		required: [true, "Studenti duhet te kete nje emer"],
	},
	surname: {
		type: String,
		required: [true, "Studenti duhet te kete nje mbiemer"],
	},
	avgGrade: {
		type: Number,
		default: 5,
	},
	desiredProfession: {
		type: String,
		default: "teacher",
	},
	generalData: {
		type: String,
		default: "Student",
	},
	password: {
		type: String,
		required: [true, "Studenti duhet te kete nje password"],
		minlength: 8,
		select: false,
	},
	passwordConfirm: {
		type: String,
		required: [true, "Ju lutem konfirmoni passwordin tuaj"],
		validate: {
			// Works only on CREATE and SAVE
			validator: function (el) {
				return el === this.password;
			},
			message: "Paswordet nuk jane njesoj",
		},
	},
	subjects: {
		type: Array,
		default: ["Calculus", "English", "TIK"],
	},
	subscribed: [],
});

userSchema.pre("save", async function (next) {
	// hash the password with the cost paramter of 12. the bigger the number the more cpu intensive and better the encryption
	this.password = await bcrypt.hash(this.password, 12);

	this.passwordConfirm = undefined;
	next();
});

userSchema.methods.comparePassword = async function (
	candidatePasword,
	userPasword
) {
	return await bcrypt.compare(candidatePasword, userPasword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
