import mongoose from 'mongoose';

const pinSchema = new mongoose.Schema({
    position: {
        type: Map,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 15,
        match: /[A-Za-z]/
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 32,
        maxlength: 512,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 96,
    }
});

pinSchema.set('toJSON', {
    versionKey: false,
    virtuals: true,
    transform: (doc, ret) => { delete ret._id}
});

export default mongoose.model('pins', pinSchema);