import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import LoginRegister from "./components/LoginRegister";
import BlogForm from './components/BlogForm';
import YourPosts from './components/YourPosts';
import FullPost from './components/FullPost';
import UserProfile from './components/UserProfile';
import AllPosts from './components/AllPosts';
import Contact from './components/Contact';
import GoToTopButton from './components/GoToTopButton';

const App = () => {
   const [allBlogs , setAllBlogs ] = useState();
  
      const getAllBlogs =async(req,res)=>{
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
        <Route path='/allPosts' element={<AllPosts></AllPosts>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>
      </Routes>
      </BrowserRouter>  
    </>
  )
}

export default App