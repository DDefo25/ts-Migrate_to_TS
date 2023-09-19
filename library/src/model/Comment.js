const {Schema, model} = require('mongoose');

const commentSchema = new Schema({
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

module.exports = model('Comment', commentSchema)