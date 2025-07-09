import React, { useState } from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../components/Auth';
import { toast } from 'react-toastify';

const ManagePosts = ({allBlogs}) => {
  const {user} = useAuth()
  const [allPosts , setAllPosts] = useState(allBlogs)

    const deletePost=async(postId)=>{
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/delPost`,{
            method:"POST" , 
            headers: {
            "Content-Type": "application/json",
          },
            body:JSON.stringify({blogId : postId , email:user?.email})
          })
  
          if(res.ok){
            const resData = await res.json() 
  
            // console.log(resData)
  
  
            setAllPosts(resData.allBlogs)  
  
            toast.success(resData.message)
          }
          else{
            console.log("Some Error occurred")
          }
  
      } catch (error) {
        console.log(error)
      }
    }
  return (
<>
      <h2>Manage Blogs</h2>
      <p>This is where you manage blogs.</p>

      <div className='posts'>
          <table className='postTable'>
            <tr>
            <th>#</th>
            <th>Blog Name</th>
            <th>Published Date & Time</th>
            <th style={{textAlign:"center"}}>Edit</th>
            <th>Delete</th>
            </tr>
            {
              allPosts?.map((post,idx)=>{
                const dateObj = new Date(post?.postedOn);
                const date = dateObj.toLocaleDateString(); 
                const time = dateObj.toLocaleTimeString(); 
                return <>
                  <tr>
                    <th>{idx+1}</th>
                    <th>{post.title}</th>
                    <th>{date} &  {time}</th>
                    <th>
                    <NavLink to={`/editPost/${post._id}`} style={{cursor:"pointer" ,textDecoration:"none"}}>
                    <div>
                    <CiEdit /> Edit
                    </div>
                    </NavLink>
                    </th>
                    <th style={{textAlign:"center"}}><MdDelete style={{cursor:"pointer"}} onClick={()=>deletePost(post?._id)}/></th>
                  </tr>
                </>
              })
            }
          </table>
      </div>
    </>  )
}

export default ManagePosts