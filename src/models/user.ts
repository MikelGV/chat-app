import mongoose, { ObjectId } from "mongoose";

const Schema = mongoose.Schema;

interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    status: string;
    chats: ObjectId
};

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Hey i'm new!"
    },
    chats: [{
        type: Schema.Types.ObjectId,
        ref: 'Chats'
    }]
});

export = mongoose.model<UserDocument>('User', userSchema)