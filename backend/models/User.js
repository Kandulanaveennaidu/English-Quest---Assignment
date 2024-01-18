const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.virtual('books', {
    ref: 'Book',
    foreignField: 'createdBy',
    localField: '_id'
});

userSchema.set('toJSON', { virtuals: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//verify password
userSchema.methods.isPasswordMatch = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
}

//model
const User = mongoose.model('User', userSchema);

module.exports = User;
