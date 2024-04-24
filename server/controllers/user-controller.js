const user = require("../models/user-model");
const blogs = require("../models/blogs-model");
const updateUserDetailsById = async (req, res) => {
    try{
        const userData = req.body;
        const id  = req.params.id
        const username = userData.username;
        const usernameTaken = await user.findOne({ username: username, _id: { $nin: id } });
        if (usernameTaken) {
            return res.status(400).json({ message: "Username is already taken" });
        }
        await user.updateOne({_id : id}, {$set: userData})
        console.log(userData);
        return res.status(200).json({message : userData});
    }catch(error){
        console.log(error)
    }
}

const getAllBlogs = async (req, res) => {
    try{
        const allBlogs = await blogs.find();
        return res.status(200).json({message : allBlogs});
    }catch(error){
        console.log(error)
    }
}
const deleteBlogs = async (req, res) => {
    try{
        await blogs.deleteMany({id : {$gte : 0}})
        return res.status(200).json({message : "delete successfully"});
    }catch(error){
        console.log(error)
    }
}

const getSingleBlogById = async (req, res) => {
    try{
        const id = req.params.id;
        console.log("finding Id", id);
        const singleBlog = await blogs.findOne({_id : String(id)});
        // const allBlogs = await blogs.find();
        return res.status(200).json({message : singleBlog});
    }catch(error){
        console.log(error)
    }
}

const getSingleBlogToReadById = async (req, res) => {
    try{
        const id = req.params.id;
        console.log("finding Id", id);
        const singleBlog = await blogs.findOne({_id : String(id)});
        // const allBlogs = await blogs.find();
        return res.status(200).json({message : singleBlog});
    }catch(error){
        console.log(error)
    }
}

const getUsersBlogByUsername = async (req, res) => {
    try{
        const username = req.params.username;
        console.log("finding username", username);
        const userBlogs = await blogs.find({username : username});
        // const allBlogs = await blogs.find();
        return res.status(200).json({message : userBlogs});
    }catch(error){
        console.log(error)
    }
}

const postBlogs = async (req, res) => {
    try{
        const data = req.body;
        await blogs.create(data)
        console.log("blog data uploaded by the user", data)
        return res.status(200).json({message : data});
    }catch(error){
        console.log(error)
    }
}

const updateBlogsById = async (req, res) => {
    try{
        const id = req.params.id;
        const updatedBlogData = req.body;
        await blogs.updateOne({_id: id}, {$set : updatedBlogData} )
        return res.status(200).json({message : updatedBlogData});
    }catch(error){
        console.log(error)
    }
}
const deleteBlogsById = async (req, res) => {
    try{
        const id = req.params.id;
        await blogs.deleteOne({_id: id})
        return res.status(200).json({message : "Deleted blog successfully"});
    }catch(error){
        console.log(error)
    }
}

module.exports = {updateUserDetailsById, getAllBlogs, getSingleBlogById, getSingleBlogToReadById, postBlogs, getUsersBlogByUsername, updateBlogsById, deleteBlogsById, deleteBlogs};