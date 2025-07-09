import React from 'react'
import "../css/Navbar.css"
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './Auth'
import { toast } from 'react-toastify'
import { useScroll } from '../context/ScrollContext'
import { useState } from 'react'

const Navbar = () => {
    const location = useLocation();
    const { isLoggedIn, user, LogoutUser } = useAuth();
    const { scrollTo, workingSectionRef, sampleBlogSectionRef, successStoriesSectionRef, whyChooseUsSectionRef, pricingSectionRef } = useScroll()
    const navigate = useNavigate()

    const logout = () => {
        LogoutUser()
        toast.success("You are logged out")
        navigate('/login');
    }

    const [showNavContent,setshowNavContent] = useState(false)


    return (
        <>
            {/* <div className='otrDiv'>
                <NavLink to='/' onClick={() => window.scrollTo({ top: "0", behavior: "smooth"})}>
                    📖 BlogEDastan 📰
                </NavLink>

{location.pathname=='/' || location.pathname=='/home' ? <>
                    <span onClick={()=>scrollTo(workingSectionRef)} className='span'>How It Works</span>

                    <span onClick={()=>scrollTo(sampleBlogSectionRef)} className='span'>Sample Blogs</span>

                    <span onClick={()=>scrollTo(whyChooseUsSectionRef)} className='span'>Why Choose Us?</span>

                    <span onClick={()=>scrollTo(successStoriesSectionRef)} className='span'>Success Stories</span>

                    <span onClick={()=>scrollTo(pricingSectionRef)} className='span'>Pricing</span>
                    
                    </>:""}

              {isLoggedIn?  <NavLink to='/contact' onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>
                    <span>Contact Us</span>
                </NavLink>:""}

                <NavLink to='/allPosts'><span>All Posts</span>
                </NavLink>

                {isLoggedIn?<><NavLink to='/yourPosts'>

                    <span>Your posts</span>
                </NavLink>
                
                <NavLink to='/createPost'>

                    {location.pathname.startsWith("/editPost") ? "" :<span>Create a Post</span>}
                </NavLink>

                </>:""}


                {!isLoggedIn ? <NavLink to="/login">

                    <button className='btn1'>Login  <i className="fa-solid fa-hand fa-shake" style={{ color: "#FCF596" }}></i> Register</button>
                </NavLink> : <><NavLink to="/profile"><img src={user?.image || "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt='userimage' className='img4' ></img></NavLink>

                {user?.isAdmin ? <NavLink to={'/dashboard'}><button className='btn1' style={{backgroundColor:"lightcoral"}}>Dashboard</button></NavLink>:""}

                <button className='btn1' onClick={logout}>Logout</button>

                </>}
            </div> */}


            <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid ">
        <NavLink
          className="navbar-brand"
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{fontSize:"18px"}}
        >
          📖 BlogEDastan 📰
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded={!showNavContent}
          aria-label="Toggle navigation"
          onClick={()=>setshowNavContent(!showNavContent)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${showNavContent?"show":""}`} id="navbarTogglerDemo02">
          <ul className={`navbar-nav ms-auto mb-lg-0 ${!showNavContent?"otrDiv":""}`}>
            {(location.pathname === "/" || location.pathname === "/home") && (
              <>
                <li className="nav-item">
                  <span className="nav-link" onClick={() => scrollTo(workingSectionRef)}>How It Works</span>
                </li>
                <li className="nav-item">
                  <span className="nav-link" onClick={() => scrollTo(sampleBlogSectionRef)}>Sample Blogs</span>
                </li>
                <li className="nav-item">
                  <span className="nav-link" onClick={() => scrollTo(whyChooseUsSectionRef)}>Why Choose Us?</span>
                </li>
                <li className="nav-item">
                  <span className="nav-link" onClick={() => scrollTo(successStoriesSectionRef)}>Success Stories</span>
                </li>
                <li className="nav-item">
                  <span className="nav-link" onClick={() => scrollTo(pricingSectionRef)}>Pricing</span>
                </li>
              </>
            )}

            {isLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  Contact Us
                </NavLink>
              </li>
            )}

            <li className="nav-item">
              <NavLink className="nav-link" to="/allPosts">All Posts</NavLink>
            </li>

            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/yourPosts">Your Posts</NavLink>
                </li>

                {!location.pathname.startsWith("/editPost") && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/createPost">Create a Post</NavLink>
                  </li>
                )}
              </>
            )}

            {!isLoggedIn ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  <button className="btn btn-warning">Login <i className="fa-solid fa-hand fa-shake" style={{ color: "#FCF596" }}></i> Register</button>
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item" style={{marginRight:"10px"}}>
                  <NavLink className="nav-link" to="/profile">
                    <img
                      src={user?.image || "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                      alt="user"
                      className="rounded-circle"
                      style={{ width: "35px", height: "35px", objectFit: "cover"}}
                    />
                  </NavLink>
                </li>

                {user?.isAdmin && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/dashboard">
                      <button className="btn btn-danger">Dashboard</button>
                    </NavLink>
                  </li>
                )}

                <li className="nav-item">
                  <button className='btn1' onClick={logout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
        </>
    )
}

export default Navbar