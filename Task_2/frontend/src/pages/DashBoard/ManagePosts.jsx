import React, { useState } from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../components/Auth';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import SideBar from './SideBar';
import Dashboard from './Dashboard';
import Navbar from '../../components/Navbar';

const ManagePosts = ({ allBlogs }) => {
  const { user } = useAuth()
  const [allPosts, setAllPosts] = useState([])
  const [searchTxt, setSearchTxt] = useState('')
  const [filteredPosts, setFilteredPosts] = useState()

  // console.log(allPosts);
  const deletePost = async (postId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/delPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blogId: postId, email: user?.email })
      })

      if (res.ok) {
        const resData = await res.json()

        // console.log(resData)


        setAllPosts(resData.allBlogs)

        toast.success(resData.message)
      }
      else {
        console.log("Some Error occurred")
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = (e) => {
    const query = e.target.value
    setSearchTxt(query);
  }

  useEffect(() => {
    const filtered = allPosts?.filter((elem) =>
      elem.title?.toLowerCase().includes(searchTxt?.toLowerCase())
    );

    setFilteredPosts(filtered?.length == 0 && searchTxt=='' ? allBlogs : filtered);
  }, [searchTxt, allPosts]);

  useEffect(() => {
    setAllPosts(allBlogs)
  }, [allBlogs])

// console.log(allBlogs , filteredPosts);

  return (
    <>
      <Navbar></Navbar>
      <div className='mainDiv'>
        <div className=''>
          <SideBar></SideBar>
        </div>

        <div className='mainDiv1'>

          <div className='managePosts'>

            <div>
              <h2>Manage Blogs</h2>
              <p>This is where you manage blogs.</p>
            </div>

            <div className='inpDiv'>
              <input type="text" className='inp' placeholder='Search' onChange={handleSearch} value={searchTxt} name='searchTxt' />
            </div>

          </div>

          <div className='posts'>
            <table className='postTable'>
              <thead>
                <tr className='head'>
                  <th>#</th>
                  <th>Blog Name</th>
                  <th>Published Date & Time</th>
                  <th style={{ textAlign: 'center' }}>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts?.length > 0 ? (
                  filteredPosts.map((post, idx) => {
                    const dateObj = new Date(post?.postedOn);
                    const date = dateObj.toLocaleDateString();
                    const time = dateObj.toLocaleTimeString();
                    return (
                      <tr key={idx}>
                        <th>{idx + 1}</th>
                        <th>{post.title}</th>
                        <th>
                          {date} & {time}
                        </th>
                        <th>
                          <NavLink
                            to={`/editPost/${post._id}`}
                            style={{ cursor: 'pointer', textDecoration: 'none' }}
                          >
                            <div>
                              <CiEdit /> Edit
                            </div>
                          </NavLink>
                        </th>
                        <th style={{ textAlign: 'center' }}>
                          <MdDelete
                            style={{ cursor: 'pointer' }}
                            onClick={() => deletePost(post?._id)}
                          />
                        </th>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '1rem' , fontWeight:"500"}}>
                      No posts found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <br />
          </div>

        </div>
      </div> </>)
}

export default ManagePosts