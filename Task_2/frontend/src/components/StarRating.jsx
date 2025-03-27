import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useAuth } from './Auth';
const StarRating = ({blogId , postDisplay}) => {
    const {user,isLoggedIn} = useAuth()
    const [rating,  setRating] = useState(0);
    const [avgRating , setAvgRating] = useState(0);
    const [ratingCtn , setRatingCtn] = useState(0);

    const handleStarClick = (rate) => {
      setRating(rate);  
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          stars.push(
            <span
              key={i}
              onClick={() => handleStarClick(i)}
              style={{
                fontSize: '24px',
                cursor: 'pointer',
                color: i <= rating ? '#ffcc00' : '#ddd',
              }}
            >
              &#9733;
            </span>
          );
        }
        return stars;
      };


      const giveRating=async(req,res)=>{
        if(isLoggedIn) {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/rating`,{
                method:"POST" , 
                headers: {
                          'Content-Type': 'application/json',
                      },
              body:JSON.stringify({rating:rating , blogId:blogId , userId :user?._id})
            })


              const resData = await res.json();

              const rate =resData?.blog?.rating?.[user._id]
              setRating(rate) 
              
              toast.success(resData.message)  
              
              getRating();

        } catch (error) {
            console.log(error)
        }
      }
      else{
        toast.error("You must be logged in")
        setRating(0)
      }
      }



      const getRating = async(req,res)=>{
          try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/getRating`,{
        method:"POST" , 
          headers: {
					'Content-Type': 'application/json',
				},
        body:JSON.stringify({blogId:blogId , userId:user._id})
      })

			const resData = await res.json();

      setRating(resData.userRating)
      setAvgRating(resData.avgRating)
      setRatingCtn(resData.ratingCtn)


        } catch (error) {
          console.log(error)
        }
      
      }
      
          
          useEffect(() => {
            if (user?._id && blogId) {
              getRating();
            }
          }, [user?._id ,blogId]); 


          return (
    <>
     <span>Rating: {avgRating==="NaN" ? 0 : avgRating}⭐ <span style={{fontSize:"12px" , fontWeight:"600"}}> (Based on {ratingCtn} reviews)</span></span>
    <div className='starDiv'>
     {renderStars()} 
     <div style={{marginLeft:"10px"}}>{rating ==0 ? `Your rating: ${rating}` : `You rated ${rating} stars ` }</div>
    </div>
    <button className='btn1' onClick={giveRating}>Rate</button>
    </>
  )
}

export default StarRating