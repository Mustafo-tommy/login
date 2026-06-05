import mongoose from "mongoose";

export async function connectDB(DB_URI) {
	try {
		await mongoose.connect(DB_URI);
		console.log("DB connected successfully");
	} catch (error) {
		console.error("Error connecting with DB: ", error);
	}
}
