const express = require('express')
const router = new express.Router()
const validate = require('../middleware/validate') 
const { register, getAllUsers, login, getUser, updateProfile, delUser, getUserById } = require('../controllers/userController')
const signupSchema = require('../validators/signupSchema')
const loginSchema = require('../validators/loginSchema')
const blogSchema = require('../validators/blogSchema')
const { createBlog, getYourBlog, getAllBlogs, delPost, editPost, getParticularBlogUser, updatePinStatus } = require('../controllers/blogController')
const { getSuccessStories } = require('../controllers/successStoriesController')
const { generateAnswerUsingAi } = require('../controllers/openAiController')
const {getAllPlans, createSession, getPlan} = require('../controllers/pricingController')
const auth = require('../middleware/auth.js')
const { rating, comment, delComment, getRating, editComment } = require('../controllers/rating&CommentController.js')
const { contact } = require('../controllers/controller.js')
const { like
    , isLiked 
} = require('../controllers/likeController.js')


router.post('/register',validate(signupSchema),register)
router.post('/login',validate(loginSchema) , login)
router.post('/createPost', validate(blogSchema) ,createBlog)
router.post('/getAnswer' ,generateAnswerUsingAi)
router.post('/getYourPost' ,getYourBlog)
router.post('/rating' ,rating)
router.post('/getRating' ,getRating)
router.post('/comment' ,comment)
router.post('/delComment' ,delComment)
router.post('/editComment' ,editComment)
router.post('/contact' ,contact)
router.post('/delPost' ,delPost)
router.post('/delUser' ,delUser)
router.post('/getParticularBlogUser' ,getParticularBlogUser)
router.post('/createSession' ,createSession)
router.post('/getPlan' ,getPlan)
router.post('/like' ,like)
router.post('/isLiked' ,isLiked)
router.post('/updatePinStatus' ,updatePinStatus)
router.post('/getUserById' ,getUserById)


router.get('/allUsers',getAllUsers)
router.get('/allsuccessStories',getSuccessStories)
router.get('/user',auth , getUser)
router.get('/getAllBlogs', getAllBlogs)
router.get('/getAllPlans', getAllPlans)

router.put('/updateProfile', updateProfile)

router.patch('/editPost' , editPost)


module.exports = router
