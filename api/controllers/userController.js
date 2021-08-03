const User = require("../models/userModel");
const factory = require("./handlerFactory");

exports.getAllUsers = factory.getAll(User);

exports.deleteUser = factory.deleteOne(User);

exports.updateUser = factory.updateOne(User);
