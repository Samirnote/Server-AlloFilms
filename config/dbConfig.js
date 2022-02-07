const mongoose = require("mongoose");

const endpoint = process.env.MONGODB_URI || "mongodb://127.0.0.1/";

mongoose
	.connect(endpoint)
	.then((db) => console.log("DB connected: ", db.connection.name))
	.catch((e) => console.error(e));
