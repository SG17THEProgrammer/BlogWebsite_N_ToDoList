import React, { useState } from 'react'
import { useAuth } from '../../components/Auth'
import { NavLink } from 'react-router-dom'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'

const ManageUsers = ({allUsers}) => {
  const {user} = useAuth()
 const [allusers , setallusers] = useState(allUsers)

 const deleteUser=async(postId)=>{
       try {
         const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/delUser`,{
             method:"POST" , 
             headers: {
             "Content-Type": "application/json",
           },
             body:JSON.stringify({userId :user?._id})
           })
   
           if(res.ok){
             const resData = await res.json() 
   
             // console.log(resData)
   
   
             setallusers(resData.allUsers)  
   
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
    <h2>Users</h2>
    <p>This is where you manage blogs.</p>

      <div className='posts'>
          <table className='postTable'>
            <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Register Date & Time</th>
            <th style={{textAlign:"center"}}>Edit</th>
            <th>Delete</th>
            </tr>
            {
              allusers?.map((user,idx)=>{
                const dateObj = new Date(user?.date);
                const date = dateObj.toLocaleDateString(); 
                const time = dateObj.toLocaleTimeString(); 
                return <>
                  <tr>
                    <th>{idx+1}</th>
                    <th>{user?.name}</th>
                    <th>{user?.email}</th>
                    <th>{date} &  {time}</th>
                    <th>
                    <NavLink to={`/editPost/${user._id}`} style={{cursor:"pointer" ,textDecoration:"none"}}>
                    <div>
                    <CiEdit /> Edit
                    </div>
                    </NavLink>
                    </th>
                    <th style={{textAlign:"center"}}><MdDelete style={{cursor:"pointer"}} onClick={()=>deleteUser(user?._id)}/></th>
                  </tr>
                </>
              })
            }
          </table>
      </div>

  </>
  )
}

export default ManageUsers