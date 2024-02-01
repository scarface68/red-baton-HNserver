const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    readNewsItems: [{type: mongoose.Schema.Types.ObjectId, ref: 'NewsItem'}],
    deletedNewsItems: [{type: mongoose.Schema.Types.ObjectId, ref: 'NewsItem'}],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;