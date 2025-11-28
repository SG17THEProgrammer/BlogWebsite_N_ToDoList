import React from 'react'
import '../css/Main.css'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../components/Auth'
const Main = () => {
  const {smoothScroll} = useAuth()
  return (
    <>
    <div style={{height:"100vh" , marginTop:"50px"}}>

        <img src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="home_image" className='img1' />

        <div className='content'>
            <h1>Tired Of Writing Blog Posts ? </h1>
            <h2 style={{marginBottom:"15px"}}>No problem . We got your back !!</h2>
            <h3>We're simple , straight forward and flexible. 
            </h3>
            <br />
            <p className='txt'>Create your blog the way you want — manually with your own creativity or automatically by providing keywords or prompts.</p>
            <br />
            <p className='txt1'>Creating a blog has never been easier! You have the flexibility to craft your blog manually, putting your unique thoughts and creativity into every word. Or, if you're short on time or inspiration, you can generate a blog automatically by simply providing keywords or a prompt. Whether you prefer a hands-on approach or a smarter, AI-powered solution, we've got you covered.</p>
<br />
            <NavLink to='/createPost'>
            <button className='btn1' onClick={smoothScroll}> Get Started </button>
            </NavLink>

        </div>
    </div>
    </>
  )
}

export default Main