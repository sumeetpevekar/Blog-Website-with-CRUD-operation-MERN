const {Schema, model} = require("mongoose")

const blogSchema = new Schema({
    id  : {
        type : Number,
    },
    title  : {
        type : String,
        required : true,
    },
    body  : {
        type : String,
        required : true,
    },
    userId  : {
        type : Number,
    },
    tags  : {
        type : [String],
        required : true,
    },
    reactions  : {
        type : Number,
    },
    username : {
        type : String,
        required : true
    },
})

const blogs = new model('blogs', blogSchema);
module.exports = blogs;