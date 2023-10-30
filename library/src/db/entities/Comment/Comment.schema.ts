import {Schema} from 'mongoose';

const CommentSchema = new Schema({
    bookId: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Number,
        require: true,
    }
})

export { CommentSchema }