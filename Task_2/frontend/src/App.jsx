import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginRegister from "./pages/LoginRegister";
import BlogForm from './pages/BlogForm';
import YourPosts from './pages/YourPosts';
import FullPost from './pages/FullPost';
import UserProfile from './pages/UserProfile';
import AllPosts from './pages/AllPosts';
import Contact from './pages/Contact';
import GoToTopButton from './components/GoToTopButton';
import Dashboard from './pages/DashBoard/Dashboard';
import ManagePosts from './pages/DashBoard/ManagePosts';
import ManageUsers from './pages/DashBoard/ManageUsers';
import ScrapedBlogs from './pages/ScrapedBlogs';
import Bookmark from './pages/Bookmark';

const App = () => {
   const [allBlogs , setAllBlogs ] = useState();
   const [allUsers, setAllUsers] = useState();

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

      const getAllUsers = async()=>{
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

  return (
    <>
    <GoToTopButton></GoToTopButton>
      <BrowserRouter>
      <Routes>
        <Route path='' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/login' element={<LoginRegister></LoginRegister>}></Route>
        <Route path='/createPost' element={<BlogForm motive=
        {"Create A Post"}></BlogForm>}></Route>
        <Route path='/editPost/:id' element={<BlogForm motive={"Edit Post"} allBlogs={allBlogs}></BlogForm>}></Route>
        <Route path='/yourPosts' element={<YourPosts></YourPosts>}></Route>
        <Route path='/completePost/:id' element={<FullPost></FullPost>}></Route>
        <Route path='/profile' element={<UserProfile></UserProfile>}></Route>
        <Route path='/bookmarks' element={<Bookmark></Bookmark>}></Route>
        <Route path='/allPosts' element={<AllPosts></AllPosts>}></Route>
        <Route path='/scrapedBlog/:id' element={<ScrapedBlogs></ScrapedBlogs>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>
        <Route path='/dashboard' element={<Dashboard allBlogs={allBlogs} allUsers={allUsers}></Dashboard>}></Route>
        <Route path='/managePosts' element={<ManagePosts allBlogs={allBlogs}></ManagePosts>}></Route>
        <Route path='/manageUsers' element={<ManageUsers allUsers={allUsers} ></ManageUsers>}></Route>
        <Route path='/addPost' element={<BlogForm dash={true} motive={"Create A Post"}></BlogForm>}></Route>
      </Routes>
      </BrowserRouter>  
    </>
  )
}

export default App