import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom';
import '../css/FullPost.css'
import Navbar from '../components/Navbar';
import { formatDistanceToNow } from 'date-fns';
import { marked } from 'marked';
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { FaSquareGithub } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import StarRating from '../components/StarRating';
import Comment from '../components/Comment';
import { format } from 'date-fns';
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { useAuth } from '../components/Auth';
import { toast } from 'react-toastify';
import SharePopup from '../components/SharePopup';
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import axios from 'axios';

const FullPost = () => {
  const { user , setContextAllBlogs } = useAuth()
  const { id } = useParams();
  const [allBlogs, setAllBlogs] = useState();
  const [blogUser, setBlogUser] = useState();



  const postDisplay = allBlogs?.filter((elem) => elem._id === id)[0];

  const [likes, setLikes] = useState()
  const [toggleLike, setToggleLike] = useState();
  const [toggleBookmark, setToggleBookmark] = useState();

  useEffect(() => {
    setLikes(postDisplay?.likes?.length);
    setToggleLike(postDisplay?.likes.includes(user._id));
    setToggleBookmark(postDisplay?.isBookmarked)
  }, [postDisplay]);




  // console.log(postDisplay?.likes.includes(user._id));


  const getAllBlogs = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/getAllBlogs`, {
        method: 'GET'
      })

      const resData = await res.json();

      setAllBlogs(resData.allBlogs)

    } catch (error) {
      console.log(error)
    }
  }


  const getUser = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/getParticularBlogUser`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: postDisplay?.email })
      })

      const resData = await res.json();
      // console.log(resData)

      if (res.ok) {
        setBlogUser(resData.bloguser[0])
      }
      else {
        console.log("Error in fetching api")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllBlogs()
  }, [])

  useEffect(() => {
    getUser()
  }, [postDisplay?.email])


  const postedOn = postDisplay?.postedOn;
  const postedDate = new Date(postedOn);


  if (isNaN(postedDate)) {
    return <p></p>;
  }

  const timeAgo = formatDistanceToNow(postedDate, { addSuffix: true });

  const dateNday = postedDate.toString().slice(0, 3) + ', ' + postedDate.toString().substring(4, 16);


  const markdownContent = postDisplay?.description;



  const tagLength = postDisplay?.tags?.length


  const getAverageRating = (blog) => {
    const ratings = Object.values(blog.rating);
    const total = ratings.reduce((acc, rating) => acc + rating, 0);
    return total / ratings.length;
  };

  const topPosts = allBlogs
    .filter(blog => getAverageRating(blog) >= 4)
    .sort((a, b) => getAverageRating(b) - getAverageRating(a))
    .slice(0, 3);



  const socialLinks = blogUser?.socialHandle == undefined ? [] : Object.keys(blogUser?.socialHandle)
    .filter(platform => blogUser?.socialHandle[platform])
    .map(platform => ({
      platform,
      url: blogUser.socialHandle[platform]
    }));

  // console.log(socialLinks)


  const like = async (id, blogId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/like`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, blogId })
      })


      const resData = await response.json();

      console.log(resData);

      toast.success(resData.message)
      setToggleLike(resData.isLiked)
      setLikes(resData.noOfLikes)


    } catch (error) {
      console.log(error);
    }
  }

  const postLike = () => {
    like(user?._id, id)
  }

  // const isLiked = async (id, blogId) => {
  //   try {
  //       const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/isLiked`, {
  //         method: 'POST',
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ id, blogId })
  //       })


  //       const resData = await response.json();

  //       console.log(resData);


  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // useEffect(()=>{

  // isLiked(user?.id,id )
  // },[])

  const bookmark = async (blogId) =>{
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/bookmark`, {
        blogId
      }
      )

      setToggleBookmark(response.data.isBookmarked)
      setAllBlogs(response.data.allBlogs)
      setContextAllBlogs(response.data.allBlogs)
      toast.success(response.data.message)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="row">
        <div className="leftcolumn">
          <div className="card">
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center", width: "100%" }}>
              <h2>{postDisplay?.title}</h2>
              {toggleBookmark ? <FaBookmark style={{ fontSize: "20px", marginTop: "-20px" , cursor:"pointer" }} onClick={()=>bookmark(postDisplay?._id)}/> : <FaRegBookmark style={{ fontSize: "20px", marginTop: "-20px" , cursor:"pointer" }} onClick={()=>bookmark(postDisplay?._id)}/>}
            </div>
            <div className='tagdiv'>
              {postDisplay?.tags?.map((elem, idx) => {
                return <span key={idx} style={{ textTransform: "uppercase" }}>{elem}&nbsp;{idx < tagLength - 1 ? "|" : ""}&nbsp;</span>
              })}
            </div>
            <br />
            <p>{timeAgo} ({dateNday}) ,  {format(new Date(postDisplay?.postedOn), 'h:mm a')}</p>
            <div className='postImgDiv'>
              <img src={postDisplay?.image || "https://images.unsplash.com/photo-1638342863994-ae4eee256688?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="blog_image" className="fakeimg" />
            </div>
            <div dangerouslySetInnerHTML={{ __html: marked(markdownContent) }} style={{ marginTop: "20px", fontSize: "12px" }} />
          </div>
        </div>
        <div className="rightcolumn">
          <div className="card1 card">
            <h2 style={{ marginBottom: "15px" }}>Author</h2>
            <h5>{postDisplay?.name}</h5>
            <div >
              <img src={postDisplay?.authorImage} alt="" className="fakeimg" />
            </div>
            <span>{postDisplay?.email}</span>
          </div>
          <div className="card">
            <h3>Follow Me</h3>
            {socialLinks.length > 0 ? <><div className='icondiv'>
              {socialLinks?.map((elem, idx) => {
                const { url, platform } = elem;
                return (
                  <a key={idx} href={url} target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: "black" }}>
                    {platform === "linkedin" ? <FaLinkedin title="LinkedIn" className='icon1' /> : ""}
                    {platform === "facebook" ? <FaFacebook title="Facebook" className='icon1' /> : ""}
                    {platform === "instagram" ? <FaInstagramSquare className='icon1' title="Instagram" /> : ""}
                    {platform === "youtube" ? <IoLogoYoutube title="YouTube" className='icon1' /> : ""}
                    {platform === "portfolio" ? <FiLink title="Portfolio" className='icon1' /> : ""}
                    {platform === "twitter" ? <FaTwitterSquare title="Twitter" className='icon1' /> : ""}
                    {platform === "github" ? <FaSquareGithub title="GitHub" className='icon1' /> : ""}
                  </a>
                );
              })}
            </div></> : <p>No social handle for this user </p>}
          </div>
          <div className="card">
            <h3>Rate this Post</h3>
            <StarRating blogId={id} postDisplay={postDisplay} getAllBlogs={getAllBlogs}></StarRating>
          </div>

          <div className="card">
            <h3>Like and Share</h3>
            <div className='likes'>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginRight: "10px" }}>
                {!toggleLike ? <AiOutlineLike style={{ fontSize: "18px", cursor: "pointer" }} onClick={postLike}></AiOutlineLike> : <AiFillLike onClick={postLike} style={{ fontSize: "18px", cursor: "pointer" }} ></AiFillLike>}
              </div>
              <div>{likes} Likes</div>
            </div>
            <div className='shareIcons'>
              <SharePopup post={postDisplay} />
            </div>
          </div>


          <div className="card1 card ">
            <h3>Top Rated Posts</h3>
            {topPosts.map((elem, idx) => {
              return <NavLink to={`/completePost/${elem._id}`} key={idx}><div><img src={elem.image} alt="postImg" className='fakeimg' /></div></NavLink>
            })
            }
            <br />
          </div>

        </div>
      </div>

      <Comment blogId={id} postDisplay={postDisplay} getAllBlogs={getAllBlogs}></Comment>
    </>
  )
}

export default FullPost