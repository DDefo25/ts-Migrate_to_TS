import {Schema} from "mongoose";

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    authors: {
        type: String,
        required: true,
    },
    favorite: {
        type: String,
        default: '',
    },
    fileCover: {
        type: String,
        default: '',
    },
    fileName: {
        type: String,
        default: '',
    },
    fileBook: {
        type: String,
        default: '',
    },
    views: {
        type: Number,
        default: 0
    },
})

BookSchema.methods = {
    async incViews(): Promise<void> {
            this.$inc('views');
            await this.save();
    }
}

export { BookSchema }