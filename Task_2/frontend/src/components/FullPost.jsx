import React, { useEffect, useState } from 'react'
import { useParams ,NavLink} from 'react-router-dom';
import '../css/FullPost.css'
import Navbar from './Navbar';
import { formatDistanceToNow } from 'date-fns';
import { marked } from 'marked';
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import StarRating from './StarRating';
import Comment from './Comment';
import { format } from 'date-fns';

const FullPost = () => {
    const { id  } = useParams();
    const [allBlogs , setAllBlogs ] = useState();

    const getAllBlogs =async()=>{
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/getAllBlogs`,{
                method: 'GET'
            })
            
            const resData = await res.json() ; 

            setAllBlogs(resData.allBlogs)

        } catch (error) {
            console.log(error)
        }
    }

    

    useEffect(()=>{
        getAllBlogs()
    },[])

    const postDisplay = allBlogs?.filter((elem) => elem._id === id)[0];  

    const postedOn = postDisplay?.postedOn;
    const postedDate = new Date(postedOn);

  
    if (isNaN(postedDate)) {
      return <p></p>;
    }
  
    const timeAgo = formatDistanceToNow(postedDate, { addSuffix: true });

    const dateNday = postedDate.toString().slice(0, 3) + ', ' + postedDate.toString().substring(4,16);


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

  console.log(topPosts)

    return (
    <>
    <Navbar></Navbar>
<div className="row">
  <div className="leftcolumn">
    <div className="card">
      <h2>{postDisplay?.title}</h2>
      <div className='tagdiv'>
      {postDisplay?.tags?.map((elem , idx )=>{
        return <span key={idx} style={{textTransform:"uppercase"}}>{elem}&nbsp;{idx < tagLength- 1 ?"|":""}&nbsp;</span> 
      })}
      </div>
      <br />
      <h5>{postDisplay?.story}</h5>
      <p>{timeAgo} ({dateNday}) ,  {format(new Date(postDisplay?.postedOn), 'h:mm a')}</p>
      <div>
        <img src={postDisplay?.image} alt="blog_image" className="fakeimg" />
      </div> 
      <div dangerouslySetInnerHTML={{__html: marked(markdownContent) }}  style={{marginTop:"20px"}}/>
    </div>
  </div>
  <div className="rightcolumn">
    <div className="card1 card">
      <h2 style={{marginBottom:"15px"}}>Author</h2>
      <h5>{postDisplay?.name}</h5>
      <div >
      <img src={postDisplay?.authorImage} alt="" className="fakeimg" />
      </div>
      <span>{postDisplay?.email}</span>
    </div>
    <div className="card">
      <h3>Follow Me</h3>
      <div className='icondiv'>
       <FaLinkedin title='Linkedin'></FaLinkedin>
        <FaFacebook title='Facebook'></FaFacebook>
        <FaInstagramSquare title='Instagram'></FaInstagramSquare>
      </div>
    </div>
    <div className="card">
      <h3>Rate this Post</h3>
        <StarRating blogId={id} postDisplay={postDisplay} getAllBlogs={getAllBlogs}></StarRating>
    </div>
    <div className="card1 card ">
      <h3>Popular Post</h3>
      {topPosts.map((elem,idx)=>{
      return <><NavLink to={`/completePost/${elem._id}`}><div><img src={elem.image} alt="postImg" className='fakeimg' /></div></NavLink><br/></>
      })
      }
    </div>
    
  </div>
</div>
  
  <Comment blogId={id} postDisplay={postDisplay} getAllBlogs={getAllBlogs}></Comment>
    </>
  )
}

export default FullPost