import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import '../css/Contact.css'
import { useAuth } from '../components/Auth'
import { toast } from 'react-toastify'
const Contact = () => {
    const {user} = useAuth()
    const [contact, setContact] = useState({
		name: "",
		email: "",
		message: "",
	})

	const [userData, setUserData] = useState(true)

	if (userData && user) {
		setContact({
			name: user.name,
			email: user.email,
			message: "",
		});
		setUserData(false);
	}

	const handleInput = (e) => {
		let name = e.target.name;
		let value = e.target.value;

		setContact({
			...contact,
			[name]: value, 
		});
	};

	// const sendEmail = async (event) => {
	// 	event.preventDefault();
	// 	const formData = new FormData(event.target);
	
	// 	formData.append("access_key", "e8fa7b2e-8a34-499e-b006-8bd583f75a46");
	
	// 	const response = await fetch("https://api.web3forms.com/submit", {
	// 	  method: "POST",
	// 	  body: formData
	// 	});
	
	// 	const data = await response.json();
	
	// 	if (data.success) {
	// 	  event.target.reset();
	// 	} else {
	// 	  //console.log("Error", data);
	// 	}
	//   };

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/contact`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(contact),
			});
			const resData = await response.json();

			if (response.ok) {	

				setContact({
					name: user.name,
					email: user.email, message: ""
				});

					toast.success(resData.message[0]);
	
			} else {
				toast.error(resData.message[0]);
			}
		} catch (error) {
			toast.error("Couldn't send the message ");
			
		}
		
	};


  return (
    <>
    <Navbar></Navbar>
    <div className='contactDiv'>
    <div className="container2">
    <div className="content1">
    <div className="left-side">
        <img src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="contactImage" className='img8' />
    </div>
      <div className="right-side">
        <div className="topic-text">Send us a message</div>
        <p>If you have any work from me or any types of quries related to my tutorial, you can send me message from here. It's my pleasure to help you.</p>
      <form action='#'>
        <div className="input-box">
          <input type="text" placeholder="Enter your name" value={contact.name} name='name' onChange={handleInput}/>
        </div>
        <div className="input-box">
          <input type="text" placeholder="Enter your email" value={contact.email} name='email' onChange={handleInput}/>
        </div>
        <div className="input-box" style={{height:"20vh" , overflow:"scroll"}}>
          <textarea type="text" placeholder="Enter your message" value={contact.message} name='message' onChange={handleInput}/>
        </div>
        
        <div className="button">
          <input type="button" value="Send Now" onClick={handleSubmit} />
        </div>
      </form>
    </div>
    </div>
  </div>
    </div>
    </>
  )
}

export default Contact