import React, { useEffect, useState } from 'react'
import '../css/SuccessStories.css'
import { useScroll } from '../context/ScrollContext';

const SuccessStories = () => {
  const {successStoriesSectionRef} = useScroll()
    const [successStories , setsuccessStories] = useState() ; 
    
      const getSuccessStories =  async() =>{
        try {
          
          const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/allsuccessStories`, {
            method: "GET",
          });
          
          if (response.ok) {
            const data = await response.json();
            // console.log(data);
    
            setsuccessStories(data.allSuccessStories);
          } else {
            console.error("Error fetching user data");
          }
        } 
        
        catch (error) {
          console.log(error);
        }
    
        }
    
        useEffect(() =>{
            getSuccessStories()
        },[])


  return (
    <>
         <div style={{ height: '0.1px' }}  ref={successStoriesSectionRef} />
        <div className='upperdiv'>
            <p className='heading'>Success Stories </p>
            <h1 style={{borderBottom:"3px solid black"}}>OUR HAPPY CUSTOMERS</h1>
        </div>
        <div className='gridbox'>
        {successStories?.map((elem,idx)=>{
            const {story,image,name,designation} = elem ; 
            return <><main className="l-card" key={idx}>
	<section className="l-card__text">
		<p>
			{story}
		</p>
	</section>
	<section className="l-card__user" key={idx}>
		<div className="l-card__userImage">
			<img src={image} alt="image" className='img3'/>
		</div>
		<div className="l-card__userInfo">
			<span>{name}</span>
			<span>{designation}</span>
		</div>
	</section>
</main>
</>
        })}
        </div>
    </>
  )
}

export default SuccessStories