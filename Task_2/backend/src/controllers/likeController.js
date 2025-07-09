const Blogs = require("../models/blogSchema");

const like = async (req, res) => {
    try {
        const userId = req.body.id ; 
        const blogId = req.body.blogId ; 
        
        const blog = await Blogs.findById(blogId)

        if (!blog) {
          return res.status(404).json('Blog not found');
        }

        const idx = blog.likes.indexOf(userId);
        let isLiked = false


        if (idx === -1) {
            blog.likes.push(userId); 
            isLiked = true
        } else {
            blog.likes.splice(idx, 1);
            isLiked = false

        }

        await blog.save();

        return res.status(200).json({ 
          message: idx === -1 ? 'Blog liked successfully' : 'Blog unliked successfully',isLiked,
          noOfLikes: blog.likes.length
        });


    } catch (error) {
        console.log(error);
    }
}


const isLiked = async(req,res)=>{
    try {
        const userId = req.body.id ; 
        const blogId = req.body.blogId ;  
        
        const blog = await Blogs.findById(blogId)

        if (!blog) {
          return res.status(404).json('Blog not found');
        }

        const isLiked = blog.likes.includes(userId);

        return res.status(200).json({
            isLiked,
        });


    } catch (error) {
        console.log(error);
    }
}

module.exports = {like 
    , isLiked
}