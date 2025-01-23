import mongoose, { Schema, Document, Model } from "mongoose";

// Import the User model to ensure proper reference
import User from "./User"; // Adjust the path to your actual User model file

export interface Wrap extends Document {
  title: string;
  description?: string;
  image: string;
  anonymous?: boolean;
  user: mongoose.Schema.Types.ObjectId; // Reference to the User model
  createdAt: Date;
}

// Define the schema for the Wrap model
const WrapSchema: Schema<Wrap> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: false, trim: true }, // Optional field
    anonymous: { type: Boolean, required: true, default: false },
    image: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User.modelName, // Use the User model's name as the reference
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // Only track `createdAt`
  }
);

// Register the Wrap model or retrieve it if already registered
const WrapMongoose: Model<Wrap> =
  mongoose.models.Wrap || mongoose.model<Wrap>("Wrap", WrapSchema);

export default WrapMongoose;
