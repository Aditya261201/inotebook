const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    // here we have to add a user to know whose notes are these.and here it works like a foreign key;
    // its type is objectid of another schema,and here refrence model is user.
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: 'String',
        required: true
    },
    description: {
        type: 'String',
        required: true,
    },
    tag: {
        type: 'String',
        default: "General"
    }, 
    date: {
        type: 'Date',
        default: Date.now
    }
}); 


module.exports = mongoose.model('notes',NotesSchema)