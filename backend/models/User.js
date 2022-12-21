const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: 'String',
        required: true
    },
    email: {
        type: 'String',
        required: true,
        unique: true
    },
    password: {
        type: 'String',
        required: true
    }, 
    date: {
        type: 'Date',
        default: Date.now
    }
}); 

const User = mongoose.model('User', UserSchema);
User.createIndexes();  // create index of user so that duplicates cant be added..(i.e.  email is unique in this case)
module.exports = User