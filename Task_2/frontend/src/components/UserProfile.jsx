import React, { useState } from 'react'
import { useAuth } from './Auth'
import '../css/UserProfile.css'
import Navbar from './Navbar'
import { toast } from 'react-toastify'
import { ImagetoBase64 } from '../utility/ImagetoBase64'

const UserProfile = () => {
  const {user} = useAuth()

console.log(user)
  const [userData, setUserData] = useState(true)
    const [userInfo , setUserInfo] = useState({
        name : "",
        email:"",
        phone:"",
        age:"" , 
        image:"" ,
        password:"",
        confirmPassword:"" ,
        youtube:"",
        instagram:"",
        facebook:"",
        twitter:"",
        github:"",
        portfolio:"",
        linkedin:""
    })

    if (userData && user) {
      setUserInfo({
            name: user.name,
            email: user.email,
            phone: user.phone,
            age: user.age,
            youtube:user.socialHandle.youtube,
        instagram:user.socialHandle.instagram,
        facebook:user.socialHandle.facebook,
        twitter:user.socialHandle.twitter,
        github:user.socialHandle.github,
        portfolio:user.socialHandle.portfolio,
        linkedin:user.socialHandle.linkedin,
        });
        setUserData(false);
    }

    // console.log(userInfo)
    const handleInput= (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUserInfo({
            ...userInfo,
            [name]: value, 
        });
    };

    const handleUploadProfileImage = async (e) => {
      const image = await ImagetoBase64(e.target.files[0])
  
  
      setUserInfo((prev) => {
        return {
          ...prev,
          image: image
        }
      })
  
    }


    const updateUser = async (e) => {
      e.preventDefault()
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/updateProfile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({userInfo  , userId:user._id})
            });
            
            if (response.ok) {
              const data = await response.json();
              // console.log(data)
              toast.success(data.message[0])
            }
            else {
                toast.error(data.message[0])
            }
        }

        catch (error) {
            toast.error("Something went wrong")
        }
    }

  return (
    <>
    <Navbar></Navbar>
    <div className='uprDiv'>
  <div className="form-container1">
    <form className="form" onSubmit={updateUser}>
      <div className="form-header1">
        <img src={userInfo.image || user.image || "images.unsplash.com/photo-1567446537708-ac4aa75c9c28?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="Profile Picture" className="profile-image1" onChange={handleInput} />
        <label htmlFor="file" style={{marginTop:"-15px" , textDecoration:"underline" , cursor:"pointer"}} className='label2'>Upload an image</label>
        <input type="file" name="file" id="file" accept='image/*' className='inp1' onChange={handleUploadProfileImage}   />
        <h2 style={{marginTop:"20px"}} className='h2'>Your Profile</h2>
        <p className='p2'>Welcome, <b>{user.name || "USERNAME"}</b> |  <span>Excited to have you onboard </span></p>
      </div>
      
      <div className="form-body1">
      <div className='side'>

        <div className="input-group">
          <label htmlFor="name" className='label2'>Full Name</label>
          <input type="text" id="name" name="name" placeholder="NAME" required value={userInfo.name} onChange={handleInput} className='input2'/>
        </div>
        
        <div className="input-group">
          <label htmlFor="email" className='label2'>Email</label>
          <input type="email" id="email" name="email" placeholder="EMAIL" required value={userInfo.email} onChange={handleInput} className='input2'/>
        </div>
      </div>

          <div className='side'>

        <div className="input-group">
          <label htmlFor="phone" className='label2'>Phone Number</label>
          <input type="tel" id="phone" name="phone" placeholder="Phone Number" required value={userInfo.phone} onChange={handleInput} className='input2'/>
        </div>
        
        <div className="input-group">
          <label htmlFor="age" className='label2'>Age</label>
          <input type="number" id="age" name="age" placeholder="Age " required value={userInfo.age} onChange={handleInput} className='input2'/>
        </div>
          </div>
        <div>
        <br />
          <h5 style={{textAlign:"left",textDecoration:"underline" , marginBottom:"20px",fontSize:"17px"}}>Change Password</h5>
          <div className='side'>

        <div className="input-group">
          <label htmlFor="password" className='label2'>New Password</label>
          <input type="password" id="password" name="password" placeholder="Enter new Password"  value={userInfo.password} onChange={handleInput} className='input2'/>
        </div>
        <br />
        <div className="input-group">
          <label htmlFor="confirmPassword" className='label2'>Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Enter Confirm Password "  value={userInfo.confirmPassword} onChange={handleInput} className='input2'/>
        </div>
          </div>

        </div>


        <div>
        <br />
          <h5 style={{textAlign:"left",textDecoration:"underline" , marginBottom:"20px" , fontSize:"17px"}}>Add your Social Media Handles</h5>
          <div className='side handle'>

        <div className="input-group">
          <label htmlFor="youtube" className='label2'>Youtube</label>
          <input type="text" id="youtube" name="youtube" placeholder="Enter Youtube Handle"  value={userInfo.youtube} onChange={handleInput} className='input2'/>
        </div>
        <div className="input-group">
          <label htmlFor="instagram" className='label2'>Instagram</label>
          <input type="text" id="instagram" name="instagram" placeholder="Enter Instagram Handle"  value={userInfo.instagram} onChange={handleInput} className='input2'/>
        </div>
        <div className="input-group">
          <label htmlFor="facebook" className='label2'>Facebook</label>
          <input type="text" id="facebook" name="facebook" placeholder="Enter Facebook Handle"  value={userInfo.facebook} onChange={handleInput} className='input2'/>
        </div>
        <div className="input-group">
          <label htmlFor="twitter" className='label2'>Twitter</label>
          <input type="text" id="twitter" name="twitter" placeholder="Enter Twitter Handle"  value={userInfo.twitter} onChange={handleInput} className='input2'/>
        </div>
        <div className="input-group">
          <label htmlFor="github" className='label2'>Github</label>
          <input type="text" id="github" name="github" placeholder="Enter Github Handle"  value={userInfo.github} onChange={handleInput} className='input2'/>
        </div>
        <div className="input-group">
          <label htmlFor="portfolio" className='label2'>Portfolio</label>
          <input type="text" id="portfolio" name="portfolio" placeholder="Enter Portfolio Handle"  value={userInfo.portfolio} onChange={handleInput} className='input2'/>
        </div>
        <div className="input-group">
          <label htmlFor="linkedin" className='label2'>LinkedIn</label>
          <input type="text" id="linkedin" name="linkedin" placeholder="Enter LinkedIn Handle"  value={userInfo.linkedin} onChange={handleInput} className='input2'/>
        </div>
          </div>

        </div>
        
        <button type="submit" className="submit-btn">Update</button>
      </div>
    </form>
  </div>
    </div>
    </>
  )
}

export default UserProfile