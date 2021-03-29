const mongoose = require('mongoose');

// post schema references the user to have a one to many relationship with the user.
const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user : {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'User' 
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},{timestamps:true});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;