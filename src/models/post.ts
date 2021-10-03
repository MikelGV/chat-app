import mongoose, { ObjectId } from "mongoose";

const Schema = mongoose.Schema;

interface postDocument extends mongoose.Document {
    title: string;
    users: ObjectId;
    message: string;

};

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    users: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: false
    }
})