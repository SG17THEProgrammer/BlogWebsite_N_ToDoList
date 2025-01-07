const Blogs = require("../models/blogSchema");


const createBlog  = async(req, res)=>{
    try {
        // console.log(req.body)
        const {name, title , story , description , image , authorImage , postedOn , tags , email,category} = req.body ; 

        const newBlog = new Blogs({
            name, title , story , description , image , authorImage , postedOn,tags , email ,category
        });

        await newBlog.save();

        return res.status(201).json({
            message: 'Blog post created successfully',
            blog: newBlog
        });

    } catch (error) {
        console.log(error)
    }
}

const delPost = async (req, res) => {
    try {
        const {blogId,email} = req.body ; 

    const blog = await Blogs.findById({_id:blogId})
  if(!blog){
    res.status(400).json({message:"Blog not found"})
    return;
  }
  await Blogs.findByIdAndDelete({_id:blogId});


  const yourBlog = await Blogs.find({email})

  res.status(200).json({message:"Blog deleted successfully",
    blogs:yourBlog
  })

    } catch (error) {
        console.log(error)
    }
}

const getYourBlog = async (req, res) => {
try {
    const email = req.body.email

    const yourBlog = await Blogs.find({email})

    return res.status(201).json({
        message: 'Your blogs found successfully',
        yourBlog: yourBlog
    });


} catch (error) {
    console.log(error)
}
}


const getAllBlogs = async (req, res) => {
try {
    const allBlogs = await Blogs.find({})
    return res.status(201).json({
        message: 'All blogs found successfully',
        allBlogs: allBlogs
    });
} catch (error) {
    console.log(error)
}
}

module.exports = {createBlog , getYourBlog,getAllBlogs , delPost}