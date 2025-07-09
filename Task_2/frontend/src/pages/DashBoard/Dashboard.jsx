import React, { useEffect, useState } from 'react'
import ManagePosts from './ManagePosts';
import BlogForm from '../BlogForm' ;
import ManageUsers from './ManageUsers';
import Sidebar from './Sidebar';
import '../../css/DashBoard.css'
import Navbar from '../../components/Navbar';
import Metrics from './Metrics';
const Dashboard = () => {

  const [activeView, setActiveView] = useState('');

  
  
  
  const [allBlogs, setAllBlogs] = useState();
  const [allUsers, setAllUsers] = useState();

  const getAllBlogs = async (req, res) => {
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

  const getAllUsers = async(req,res)=>{
      try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/allUsers`,{
              method: 'GET'
          })
          
          const resData = await res.json() ; 
          
          setAllUsers(resData.allusers)
        } catch (error) {
          console.log(error);
        }
      }
      
      useEffect(() => {
        getAllBlogs()
        getAllUsers()
      }, [])
      
      const renderView = () => {
        switch (activeView) {
          case 'managePosts':
            return <ManagePosts allBlogs={allBlogs}/>;
          case 'addPost':
            return <BlogForm dash={true} motive={"Create A Post"} />;
          case 'users':
            return <ManageUsers allUsers={allUsers}/>;
          case 'dash':
            return <Metrics allBlogs={allBlogs} allUsers={allUsers}/>;
          default:
            return <Metrics allBlogs={allBlogs} allUsers={allUsers}/>
        }
      };

  return (
    <>
<Navbar></Navbar>
<div className="app-container">
      <Sidebar setActiveView={setActiveView} />
      <div className="main-content">
        {renderView()}
      </div>
    </div>  
    </>
    )
}

export default Dashboard