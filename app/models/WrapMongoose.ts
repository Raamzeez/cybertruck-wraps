import mongoose, { Schema, Document, Model } from "mongoose";
import User from "./User";

export interface Wrap extends Document {
  title: string;
  image: string;
  filename: string;
  createdAt: Date;
  anonymous: boolean;
  description?: string;
  official: boolean;
  user: mongoose.Schema.Types.ObjectId;
}

const WrapSchema: Schema<Wrap> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: false, trim: true },
    filename: { type: String, required: false, trim: true },
    anonymous: { type: Boolean, required: true, default: false },
    image: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User.modelName,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const WrapMongoose: Model<Wrap> =
  mongoose.models.Wrap || mongoose.model<Wrap>("Wrap", WrapSchema);

export default WrapMongoose;
