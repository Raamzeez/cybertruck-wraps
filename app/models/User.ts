import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface for the User document
export interface User extends Document {
  name?: string;
  email: string;
  image?: string;
}

const UserSchema: Schema<User> = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  image: { type: String, required: false },
});

// Register the User model or retrieve it if it’s already registered
const User: Model<User> =
  mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default User;
