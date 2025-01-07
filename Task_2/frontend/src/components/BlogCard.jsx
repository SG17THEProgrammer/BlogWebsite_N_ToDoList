import React, { useEffect, useState } from 'react'
import Card from './Card';
const BlogCard = () => {
  const [allBlogs , setAllBlogs] = useState() ; 

  const getAllBlogs =async()=>{
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/getAllBlogs`,{
            method: 'GET'
        })
        
        const resData = await res.json() ; 

        setAllBlogs(resData.allBlogs)

    } catch (error) {
        console.log(error)
    }
}



useEffect(()=>{
    getAllBlogs()
},[])


const topPosts = allBlogs?.slice(0,6)

  return (
    <>
       <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">

    {topPosts?.map((_, idx) => (
      <button
        key={idx}
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to={idx}
        className={idx === 0 ? "active" : ""}
        aria-current={idx === 0 ? "true" : "false"}
        aria-label={`Slide ${idx + 1}`}
        style={{ backgroundColor: "black" }}
      ></button>
    ))}
  </div>

  <div className="carousel-inner">
    {topPosts?.map((blog, idx) => (
      <div
        key={idx}
        className={`carousel-item ${idx === 0 ? "active" : ""}`}
      >
        <Card blog={blog} />
      </div>
    ))}
  </div>

  <button
    className="carousel-control-prev "
    type="button"
    data-bs-target="#carouselExampleIndicators"
    data-bs-slide="prev"
    style={{
      width: "30px",
      height: "50vh",
      marginTop: "35vh",
      }}
  >
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>

  <button
    className="carousel-control-next"
    type="button"
    data-bs-target="#carouselExampleIndicators"
    data-bs-slide="next"
    style={{
      width: "30px",
      height: "50vh",
      marginTop: "35vh",
    }}
  >
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

    </>
  )
}

export default BlogCard