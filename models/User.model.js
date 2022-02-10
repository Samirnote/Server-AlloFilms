const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		name: {
			type: String,
		},
		avatar:{
			type : String,
			default : "https://www.clipartmax.com/png/full/72-722180_these-are-some-cats-avatar-i-drew-during-my-free-time-black.png"
		},
		email: {
			type: String,
			unique: true,
		},
		password: String,
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
);

module.exports = model("User", userSchema);
