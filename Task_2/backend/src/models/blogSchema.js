const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: {
      type: String,
      required: true,
    },
    userImage: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },{ timestamps: true });
  
const blogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true , 
    },
    email: {
        type: String,
        required: true
    },
    rating: {
            type: Map,
            of: Number, //key is userId and the value is the rating
            default: {},
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    comments: {
    type: [commentSchema], 
    default: [],
  },
  likes:{
    type: [String],
    default: []  
},
    authorImage: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true,
    },
    access:{
        type: String,
        enum: ["Basic", "Standard", "Premium"],
        // required: true
    },
    postedOn: {
        type: Date,
        default: Date.now,
        required: true
    }
}, { timestamps: true });


const Blogs = mongoose.model('Blogs', blogSchema);

module.exports = Blogs;
