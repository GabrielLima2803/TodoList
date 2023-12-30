const mongoose = require('mongoose');
const argon2 = require('argon2');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    Tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
})


userSchema.statics.updatePassword = async function (email, newPassword) {
    const hashedPassword = await argon2.hash(newPassword);
  
    await this.findOneAndUpdate({ email }, { password: hashedPassword });
  };
  
const User = mongoose.model('User', userSchema);
module.exports = User