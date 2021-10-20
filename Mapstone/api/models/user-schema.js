import mongoose from 'mongoose';
import argon2 from 'argon2';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 15,
        match: /[A-Za-z]/
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 64
    },
    admin: {
        type: Boolean,
        required: true
    }
});

userSchema.set('toJSON', {
    versionKey: false,
    virtuals: true,
    transform: (doc, ret) => { delete ret._id}
});

userSchema.pre('save', async function() {
    try {
        const hash = await argon2.hash(this.password, {
            type: argon2.argon2id
        });
        this.password = hash;
    } catch (err) {
        console.log('Error in Hasing: ' + err);
    }
});

userSchema.methods.verifyPassword = 
    async function(plainTextPassword) {
        const dbHashedPassword = this.password;
        try {
            return await argon2.verify(dbHashedPassword, plainTextPassword);
        } catch (err) {
            console.log('Error verifying password:' + err);
        }
    }

export default mongoose.model('user', userSchema);