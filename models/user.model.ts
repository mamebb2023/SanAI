import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IUser extends Document {
  ip: string;
  lastConnectedAt: number;
}

const userSchema = new Schema<IUser>({
  ip: { type: String, required: true, unique: true },
  lastConnectedAt: { type: Number, required: true },
});

export const User = models.User || model<IUser>("User", userSchema);
