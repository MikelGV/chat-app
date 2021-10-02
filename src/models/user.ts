import mongoose, { ObjectId } from "mongoose";

const Schema = mongoose.Schema;

interface User {
    email: string;
    name: string;
    password: string;
    status: string;
    chats: ObjectId
};

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
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

export = mongoose.model<User>('User', userSchema)