import React, { useEffect, useState } from 'react'
import { useAuth } from '../../components/Auth'
import { NavLink } from 'react-router-dom'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import SideBar from './SideBar'
import Navbar from '../../components/Navbar'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios'
import { toast } from 'react-toastify'

const ManageUsers = ({ allUsers }) => {
  const { user } = useAuth()
  const [allusers, setallusers] = useState(allUsers)
  const [userId , setUserId] = useState()
  const [userData, setUserData] = useState(true)
  const [formData , setFormData] = useState({
    name:"",
        email:"",
        phone:"",
        isAdmin:0
  })
  const [findUser, setFindUser] = useState()

  const [searchTxt, setSearchTxt] = useState('')
  const [filteredUsers, setFilteredUsers] = useState()
  
  if (findUser && userData) {

      setFormData({
        ...formData,
        name: findUser.name,
        email: findUser?.email,
        phone: findUser.phone,
        isAdmin: findUser.isAdmin,
      });
      
      setUserData(false);
    }
    
    useEffect(() => {
      setFormData({
        name: findUser?.name,
        email: findUser?.email,
        phone: findUser?.phone,
        isAdmin: findUser?.isAdmin,
      });
    },[findUser , userData , user , userId])


  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  }
  

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

  const getUserById = async (id) => {
    console.log(id);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/getUserById`, {
        userId: id
      })

      setFindUser(response.data.user);

    } catch (error) {
      console.log(error);
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

    setFilteredUsers(filtered?.length == 0 && searchTxt == '' ? allusers : filtered);
  }, [searchTxt, allusers]);

  useEffect(() => {
    setallusers(allUsers)
  }, [allUsers])

  // console.log(allUsers , filteredUsers);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);
    getUserById(id)
    setUserId(id)
  };

  const handleClose = () => {
    setOpen(false);
  };


  const updateUser = async ()=>{
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_API}/updateUser`, {
        formData,
        userId
      })

      toast.success(response.data.message)

      setallusers(response.data.allUsers)
      setOpen(false)
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <Navbar></Navbar>


      <div className='mainDiv'>
        {open ? <Dialog
          fullWidth={true}
          maxWidth={'md'}
          open={open}
          onClose={handleClose}
        >
          <Box sx={{display:"flex" , justifyContent:"space-between" , alignItems:"center" , width:"97%"}}>
          <DialogTitle >Edit User</DialogTitle>
          <Button variant='contained' onClick={updateUser}>Edit</Button>
          </Box>
          <DialogContent>
            {/* <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText> */}
            <Box
              noValidate
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                m: 'auto',
                width: 'fit-content',
                columnGap: "20px",
                paddingTop: "10px"
              }}
            >
              <TextField id="outlined-basic" label="Name" variant="outlined" onChange={handleInput} name='name' value={formData.name} />
              <TextField id="outlined-basic" label="Email" variant="outlined" onChange={handleInput} name='email' value={formData.email} />
              <TextField id="outlined-basic" label="Phone" variant="outlined" type='number' value={formData.phone} onChange={handleInput} name='phone' />
              <FormControl sx={{ width: "10vw" }}>
                <InputLabel id="demo-simple-select-label">isAdmin</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="isAdmin"
                  name='isAdmin'
                  value={formData?.isAdmin}
                  // onChange={handleChange}
                  onChange={handleInput}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>  

            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog> : ""}

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
                        <th style={{ textAlign: "center" }}>

                          <div onClick={() => handleClickOpen(user._id)} style={{ color: 'blue', cursor: "pointer" }}>
                            <CiEdit /> Edit
                          </div>
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
                    <td colSpan={6} style={{ textAlign: 'center', padding: '1rem', fontWeight: "500" }}>
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