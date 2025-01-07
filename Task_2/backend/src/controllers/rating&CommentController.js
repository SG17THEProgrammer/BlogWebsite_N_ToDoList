const Blogs = require("../models/blogSchema");

const rating = async(req,res)=>{
    try {
        const {blogId ,rating ,userId} =req.body 

        const blog = await Blogs.findByIdAndUpdate(blogId)
        
          if (!blog) {
            return res.status(404).json('Blog not found');
          }
      
          blog.rating.set(userId, rating);

        await blog.save();
      
            return res.status(200).json({
              message: 'Post rated successfully',
              blog,
            });
          
    } catch (error) {
        console.log(error);
    }
}

const getRating=async(req,res)=>{
    try {
        const { blogId, userId } = req.body;
        const blog = await Blogs.findById(blogId);

        if (!blog) {
          return res.status(404).json({ message: 'Blog not found' });
        }
 
        let userRating = blog.rating.get(userId) || 0 ;

          return res.status(200).json({ userRating });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

const comment=async(req, res)=>{
    try {
        // console.log(req.body)
        const { comments, blogId} = req.body;
        const {author, userImage, text } = comments

        if (!author || !userImage || !text) {
            return res.status(400).json({ message: 'Author, user image, and text are required' });
          }

          const blog = await Blogs.findById(blogId);
    
          if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
          }
          
          if (!blog.comments) {
            blog.comments = [];  
          }

          const newComment = {
            author,
            userImage,
            text
          };
      
          blog.comments.push(newComment);
      
          await blog.save();
      
          res.status(200).json({
            message: 'Comment added successfully',
            blog
          });
      
    } catch (error) {
        console.log(error)
    }
}


const delComment=async(req, res) => {
try {
    const { blogId, commentIdx } = req.body;
    const blog = await Blogs.findById(blogId);

    if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      // Check if the comment exists at the given index
      if (blog.comments.length <= commentIdx || commentIdx < 0) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      
      //at position commentIdx remove 1 item (basically that particular commentIdx)
      blog.comments.splice(commentIdx, 1);


    await blog.save();

    res.status(200).json({
      message: 'Comment deleted successfully',
      blog
    });

} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting comment' });   
}
}


const editComment = async (req, res) => {
    try {
        const { commentId, blogId, newText } = req.body;

        const blog = await Blogs.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const comment = blog.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    comment.text = newText;
    await blog.save();

    res.json({
      message: "Comment updated successfully",
      updatedComment: comment,
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports ={rating,getRating,comment,delComment , editComment}