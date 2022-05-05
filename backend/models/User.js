const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	email: String,
	username: String,
	password: String,
});

userSchema.pre("save", function (next) {
	const user = this;

	if (user.isModified("password") || user.isNew) {
		bcrypt.genSalt(10, function (saltError, salt) {
			if (saltError) {
				return next(saltError);
			} else {
				bcrypt.hash(user.password, salt, function (hashError, hash) {
					if (hashError) {
						return next(hashError);
					}

					user.password = hash;
					next();
				});
			}
		});
	} else {
		return next();
	}
});

module.exports = {
	schema: userSchema,
	model: mongoose.models.User || mongoose.model("User", userSchema),
};
