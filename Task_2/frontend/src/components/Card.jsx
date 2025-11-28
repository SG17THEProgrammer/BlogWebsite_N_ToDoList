import React from 'react'
import { FaRegCommentDots } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { formatDistanceToNow } from 'date-fns';
import '../css/BlogCard.css'
import { NavLink } from 'react-router-dom';
import { useAuth } from './Auth';
const Card = ({blog}) => {
  const {smoothScrooling} = useAuth()
  const {description , email , name , rating , title , authorImage , tags , image , comments , postedOn ,_id } = blog
  const blogDate = new Date(postedOn);
  const daysAgo = formatDistanceToNow(blogDate, { addSuffix: true });

  const ratings = Object.values(rating);
  const total = ratings.reduce((acc, rating) => acc + rating, 0);
const avgRating = total / ratings.length; 

  return (
    <>
        <div className="blog-container">
  <div className="blog-header">
    <div>
    <img src={image || "https://images.unsplash.com/photo-1638342863994-ae4eee256688?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="image" className='blog-cover' />

      <div className="authorDiv">
      <img src={authorImage || "https://images.unsplash.com/photo-1638342863994-ae4eee256688?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="author"  className='authorImg'/>
        <h5 style={{color:"white" , fontSize:"12px" , backgroundColor:"black" , padding:"2px 7px" , borderTopLeftRadius:"10px"}}>{name}</h5>
      </div>
    </div>
  </div>

  <div className="blog-body">
    <div className="blog-title">
      <h1><NavLink to={`/completePost/${_id}`} className='a' onClick={smoothScrooling}>{title}</NavLink></h1>
    </div>
<br />
    <div className="blog-tags">
      <ul>
        {tags?.map((elem,idx)=>{
         return  <li className='a1' key={idx}>{elem}</li>
        })}

      </ul>
    </div>
  </div>
  
  <div className="blog-footer">
    <ul>
      <li className="published-date" style={{color:"black"}}>{daysAgo}</li>
      <li className="comments">
      <NavLink to={`/completePost/${_id}`}>
      <FaRegCommentDots style={{color:"brown" , marginRight:"2px"}}/> 
      <span className="numero">{comments?.length}</span>
      </NavLink>
      </li>

      <li className="shares">
      <FaRegStar style={{color:"brown", marginRight:"2px"}}/>
      <span className="numero">{avgRating ? avgRating: 'This post is not rated'}</span>
      </li>
    </ul>
  </div>

</div>
    </>
  )
}

export default Card