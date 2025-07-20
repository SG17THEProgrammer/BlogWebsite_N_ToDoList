import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const SideBar = () => {
  const location = useLocation();
  return (
    <div className="sidebar">
      <NavLink to='/dashboard' className='navlink'><h2 className='heading1'>Dashboard</h2></NavLink>
      
      <ul>
        <NavLink to='/managePosts' className='navlink'><li  className={location?.pathname === '/managePosts' ? 'active' : ''}
          >Manage Posts</li></NavLink>
        <NavLink to='/addPost' className='navlink'><li className={location?.pathname === '/addPost' ? 'active' : ''}
        >Add New Post</li></NavLink>

        <NavLink to='/manageUsers' className='navlink'><li className={location?.pathname === '/manageUsers' ? 'active' : ''}
        >Users</li></NavLink>
      </ul>
    </div>
  )
}

export default SideBar