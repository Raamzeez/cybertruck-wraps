import mongoose, { Schema, Document, Model } from "mongoose";

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

const User: Model<User> =
  mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default User;
