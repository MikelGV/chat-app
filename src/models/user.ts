import mongoose from "mongoose";


export type userDocument = mongoose.Document & {
    email: string,
    username: string,
    password: string
};

const userSchema = new mongoose.Schema<userDocument>({
    email: {
        type: String,
        unique: true
    },
    password: String,
    username: {
        type: String,
        unique: true
    }
});


export const User = mongoose.model<userDocument>("User", userSchema);