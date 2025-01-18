import React, { useEffect, useState } from 'react'
import '../css/Pricing.css'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useScroll } from '../context/ScrollContext';
import axios from "axios";
import { useAuth } from './Auth';

const Pricing = () => {
  const {user} = useAuth()
    const {pricingSectionRef} = useScroll()
  const [plans , setPlans] = useState() 

  const getPlans = async() =>{
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/getPlans`,{
                method: 'GET'
            })
            
            const resData = await res.json() ; 
// console.log(resData)
            setPlans(resData.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() =>{
    getPlans()
  },[])


  const createSession = async (priceId) => {
    const {data : response}  = await axios.post(
     `${import.meta.env.VITE_BACKEND_API}/createSession`,
      {
        priceId,
        // email:user?.email
        email:"shray3@gmail.com"
      }
    );

    window.location.href = response.url;
  };

  return (
    <>
    <div style={{height:"5vh"}}  ref={pricingSectionRef}></div>
<section>
  <div className="container">
    <p className="heading">
      PRICING PACKAGES
    </p>
    <h1 className="title">AFFORDABLE PRICES</h1>
    <br />
            <p>This is the simplest way to buy great content for your website. Cancel anytime. Just select a plan below to get started.</p>
    <div className="pricing-container">

    
      {plans?.map((elem , idx)=>{
        const {nickname ,unit_amount} = elem
        return <>
        <div className="pricing-card hobby" key={idx}>
        {nickname==="Standard" ?  <div className="card-header">
          Most Popular
        </div>:""}
        <div className="card-content">
          <h1 className="card-title">{nickname}</h1>
          <h2 className="card-subtitle"><FaIndianRupeeSign />{unit_amount/100}</h2>
          <p className="card-description">Stripe offers everything needed to run an online business at scale. Get in touch for details.</p>
          <div className="features">
            <ul>
            <div className='feature'>
            <IoMdCheckmarkCircleOutline className='iconCol'/>
              <li className="feature-item">No setup</li>
            </div>
            <div className='feature'>
            <IoMdCheckmarkCircleOutline className='iconCol'/>
              <li className="feature-item">No setups</li>
            </div>
            <div className='feature'>
            <IoMdCheckmarkCircleOutline className='iconCol'/>
              <li className="feature-item">Speed</li>
            </div>
            </ul>
          </div>
          <div className="card-action">
            <button className="select-btn" onClick={()=>createSession(elem.id)}>Select</button>
          </div>
        </div>
      </div>
        </>
      })}


    </div>
  </div>
</section>

    </>
  )
}

export default Pricing