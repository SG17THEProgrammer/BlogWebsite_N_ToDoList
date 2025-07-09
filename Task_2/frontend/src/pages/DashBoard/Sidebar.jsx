import React from 'react'

const SideBar = ({setActiveView}) => {
  return (
    <div className="sidebar">
      <h2 onClick={() => setActiveView('dash')} style={{cursor:"pointer"}}>Dashboard</h2>
      <ul>
        <li onClick={() => setActiveView('managePosts')}>Manage Posts</li>
        <li onClick={() => setActiveView('addPost')}>Add New Post</li>
        <li onClick={() => setActiveView('users')}>Users</li>
      </ul>
    </div>
  )
}

export default SideBar