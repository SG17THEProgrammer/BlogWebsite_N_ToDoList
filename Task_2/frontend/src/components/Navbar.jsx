import React from 'react'
import "../css/Navbar.css"
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './Auth'
import { toast } from 'react-toastify'
import { useScroll } from '../context/ScrollContext'

const Navbar = () => {
    const location = useLocation();
    const { isLoggedIn, user , LogoutUser } = useAuth();
    const {scrollTo , workingSectionRef ,sampleBlogSectionRef,successStoriesSectionRef,whyChooseUsSectionRef} = useScroll()
    const navigate = useNavigate()

    const logout=()=>{
        LogoutUser()
        toast.success("You are logged out")
        navigate('/login');
    }

    
    return (
        <>
            <div className='otrDiv'>
                <NavLink to='/'>
                    📖 BlogEDastan 📰
                </NavLink>

                {/* <NavLink>

                    <span>Pricing</span>
                </NavLink>
                <NavLink>

                    <span>FAQ</span>
                </NavLink> */}

{location.pathname=='/' || location.pathname=='/home' ? <>
                    <span onClick={()=>scrollTo(workingSectionRef)} className='span'>How It Works</span>

                    <span onClick={()=>scrollTo(sampleBlogSectionRef)} className='span'>Sample Blogs</span>

                    <span onClick={()=>scrollTo(whyChooseUsSectionRef)} className='span'>Why Choose Us?</span>

                    <span onClick={()=>scrollTo(successStoriesSectionRef)} className='span'>Success Stories</span></>:""}

              {isLoggedIn?  <NavLink to='/contact'>
                    <span>Contact Us</span>
                </NavLink>:""}

                <NavLink to='/allPosts'><span>All Posts</span>
                </NavLink>

                {isLoggedIn?<><NavLink to='/yourPosts'>

                    <span>Your posts</span>
                </NavLink>
                
                <NavLink to='/createPost'>

                    <span>Create a Post</span>
                </NavLink>
                </>:""}


                {!isLoggedIn ? <NavLink to="/login">

                    <button className='btn1'>Login  <i className="fa-solid fa-hand fa-shake" style={{ color: "#FCF596" }}></i> Register</button>
                </NavLink> : <><NavLink to="/profile"><img src={user?.image || "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt='userimage' className='img4' ></img></NavLink>
                <button className='btn1' onClick={logout}>Logout</button>
                </>}
            </div>
        </>
    )
}

export default Navbar