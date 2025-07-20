import React from 'react'
import BlogCard from './BlogCard'
import { useScroll } from '../context/ScrollContext'

const Blogs = () => {
  const {sampleBlogSectionRef} = useScroll()
  return (
    <>
     <div ref={sampleBlogSectionRef} style={{height:"14vh"}}/>
        <div className='topdiv' >
            <p className='heading'>Samples of Our Blogs/Articles</p>
            <h1 style={{borderBottom:"3px solid black" }}>THE ROAD SO FAR</h1>
            <br />
            <p>Our blog website is a space for discovery, creativity, and inspiration. We share insightful stories, valuable tips, and engaging content to help guide you on your journey of growth and exploration.</p>
            <div>
                <BlogCard></BlogCard>
            </div>
        </div>
    </>
  )
}

export default Blogs