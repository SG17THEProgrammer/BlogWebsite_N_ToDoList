import React, { useEffect, useState } from 'react'
import { useAuth } from '../../components/Auth'
import { NavLink } from 'react-router-dom'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import SideBar from './SideBar'
import Navbar from '../../components/Navbar'

const ManageUsers = ({ allUsers }) => {
  const { user } = useAuth()
  const [allusers, setallusers] = useState(allUsers)
  const [searchTxt, setSearchTxt] = useState('')
  const [filteredUsers, setFilteredUsers] = useState()

  const deleteUser = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/delUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?._id })
      })

      if (res.ok) {
        const resData = await res.json()

        // console.log(resData)


        setallusers(resData.allUsers)

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
    const filtered = allusers?.filter((elem) =>
      elem.email?.toLowerCase().includes(searchTxt?.toLowerCase())
    );

    setFilteredUsers(filtered?.length == 0 && searchTxt=='' ? allusers : filtered);
  }, [searchTxt, allusers]);

  useEffect(() => {
    setallusers(allUsers)
  }, [allUsers])

  // console.log(allUsers , filteredUsers);


  return (
    <>
      <Navbar></Navbar>
      <div className='mainDiv'>

        <div>
          <SideBar></SideBar>
        </div>

        <div className='mainDiv1'>

          <div className='managePosts'>

            <div>
              <h2>Users</h2>
              <p>This is where you manage blogs.</p>
            </div>


            <div className='inpDiv'>
              <input type="text" className='inp' placeholder='Search Email' onChange={handleSearch} value={searchTxt} name='searchTxt' />
            </div>
          </div>

          <div className='posts'>
            <table className='postTable'>
              <thead>
                <tr className='head'>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Register Date & Time</th>
                  <th style={{ textAlign: 'center' }}>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers?.length > 0 ? (
                  filteredUsers.map((user, idx) => {
                    const dateObj = new Date(user?.date);
                    const date = dateObj.toLocaleDateString();
                    const time = dateObj.toLocaleTimeString();
                    return (
                      <tr key={idx}>
                        <th>{idx + 1}</th>
                        <th>{user?.name}</th>
                        <th>{user?.email}</th>
                        <th>{date} & {time}</th>
                        <th>
                          <NavLink
                            to={`/editPost/${user._id}`}
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
                            onClick={() => deleteUser(user._id)}
                          />
                        </th>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '1rem', fontWeight:"500" }}>
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div></>
  )
}

export default ManageUsers