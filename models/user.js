const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);

    user.password = hash;
    next();
});

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;

    return user;
}

userSchema.methods.isValidPassword = async function (password) {
    const user = this;

    return await bcrypt.compare(password, user.password);
}

const User = mongoose.model('user', userSchema);

module.exports = User;