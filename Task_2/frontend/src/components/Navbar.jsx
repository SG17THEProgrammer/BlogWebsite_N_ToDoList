import React from 'react'
import "../css/Navbar.css"
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './Auth'
import { toast } from 'react-toastify'
import { useScroll } from '../context/ScrollContext'
import { useState } from 'react'

const Navbar = () => {
  const location = useLocation();
  const { isLoggedIn, user, LogoutUser, smoothScrooling } = useAuth();
  const { scrollTo, workingSectionRef, sampleBlogSectionRef, successStoriesSectionRef, whyChooseUsSectionRef, pricingSectionRef } = useScroll()
  const navigate = useNavigate()

  const logout = () => {
    LogoutUser()
    toast.success("You are logged out")
    navigate('/login');
  }

  const [showNavContent, setshowNavContent] = useState(false)


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid ">
          <NavLink
            className="navbar-brand"
            to="/"
            onClick={smoothScrooling} style={{ fontSize: "18px" }}
          >
            📖  BlogEDastan 📰
          </NavLink>

          <button
            className="navbar-toggler btn navbar-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded={!showNavContent}
            aria-label="Toggle navigation"
            onClick={() => setshowNavContent(!showNavContent)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${showNavContent ? "show" : ""}`} id="navbarTogglerDemo02">
            <ul className={`navbar-nav ms-auto mb-lg-0 ${!showNavContent ? "otrDiv" : ""}`}>
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
                    <span className="nav-link" onClick={() => scrollTo(pricingSectionRef)}>Pricing</span>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link" onClick={() => scrollTo(successStoriesSectionRef)}>Success Stories</span>
                  </li>
                </>
              )}

              {isLoggedIn && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact" onClick={smoothScrooling}>
                    Contact Us
                  </NavLink>
                </li>
              )}

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Posts
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li className="nav-item dropdown-item">
                <NavLink className="nav-link" to="/allPosts" onClick={smoothScrooling}>All Posts</NavLink>
              </li>

              {isLoggedIn && (
                <>
                  <li className="nav-item dropdown-item">
                    <NavLink className="nav-link" to="/yourPosts" onClick={smoothScrooling}>Your Posts</NavLink>
                  </li>

                  {!location.pathname.startsWith("/editPost") && (
                    <li className="nav-item dropdown-item">
                      <NavLink className="nav-link" to="/createPost" onClick={smoothScrooling}>Create a Post</NavLink>
                    </li>
                  )}
                </>
              )}
                </div>
              </li>

              {!isLoggedIn ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login" onClick={smoothScrooling}>
                    <button className="btn btn-warning">Login <i className="fa-solid fa-hand fa-shake" style={{ color: "#FCF596" }}></i> Register</button>
                  </NavLink>
                </li>
              ) : (
                <>
                  <li className="nav-item" style={{ marginRight: "10px" }}>
                    <NavLink className="nav-link" to="/profile" onClick={smoothScrooling}>
                      <img
                        src={user?.image || "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt="user"
                        className="rounded-circle"
                        style={{ width: "35px", height: "35px", objectFit: "cover" }}
                      />
                    </NavLink>
                  </li>

                  {user?.isAdmin && location.pathname != '/dashboard' && location.pathname != '/managePosts' && location.pathname != '/manageUsers' && location.pathname != '/addPost' && (
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/dashboard" onClick={smoothScrooling} style={{ marginRight: "10px" }}>
                        <button className="btn-success btn-sm">Dashboard</button>
                      </NavLink>
                    </li>
                  )}

                  <li className="nav-item">
                    <button className='btn-sm btn-danger' onClick={logout}>Logout</button>
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