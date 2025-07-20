import React from 'react'
import '../css/Working.css'
const Working = ({action,reference}) => {

    const workingApi =[
      {
          id:"0" ,
          image:"https://plus.unsplash.com/premium_vector-1721296173984-50e620b0af3e?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
          title:"CREATE ARTICLE",
          description:"Tell us about your blog or the blog you envision."
      },
      {
          id:"1" ,
          image:"https://plus.unsplash.com/premium_vector-1721296174938-d52482bef6dd?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
          title:"WE WRITE",
          description:"Our AI-based technology, will write a post based on your vision "
      },
      {
          id:"2" ,
          image:"https://plus.unsplash.com/premium_vector-1721296175362-c52a73ff127b?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
          title:"YOU POST",
          description:"GO nuts, Share it across social media, Build your Presence"
      },
       
    ]

      const whyChooseUsApi =[
    {
        id:"0" ,
        image:"https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        title:`BUILD MINDSHARE. CREATE AND MAINTAIN A CONSISTENT BLOG PRESENCE`,
        description:"A new blog post is an opportunity for your agency to engage your customers, show value, and strengthen your partnership."
    },
    {
        id:"1" ,
        image:"https://plus.unsplash.com/premium_photo-1695807489199-4ba908b63826?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        title:"MAKE THE IMPOSSIBLE, POSSIBLE. USE BLOG POSTS AS A PLATFORM FOR NEW IDEAS.",
        description:"A blog post can blossom into a series of posts, videos, infographics, and social media opportunities for your client."
    },
    {
        id:"2" ,
        image:"https://plus.unsplash.com/premium_photo-1661764256397-af154e87b1b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        title:"REDUCE THE NUMBER OF ONE-OFF PROJECTS AND CREATE ONGOING BUSINESS.",
        description:"There is limitless content potential with every project. Every website, every Product release should include a content strategy."
    },
     
  ]



  return (
    <>
     <div style={{ height: '13vh' }}  ref={reference} />
        <div className='topdiv'>
            <p className='heading'>{action=="howItWorks"?"SNEEK A PEAK":"WHY CHOOSE US"}</p>
            <h1 style={{borderBottom:"3px solid black" }}>{action==="howItWorks"?"HOW IT WORKS":"UNIQUELY DIFFERENT"}</h1>
<br />
            <p>The blogging struggle is real. Time is short. Writing is hard. And today's blog post keeps getting pushed into tomorrow. And then the next day.. We flip the script and get tommorow's blog post done today . </p>
            <div className='steps'>
                {action =='howItWorks' ?workingApi?.map((elem,idx)=>{
                    return <div className='particularStep' key={idx}>
                    <img src={elem.image} alt="create" className='img2'/>
                    <h2>{elem.title}</h2>
                    <p className='para'>{elem.description}</p>
                </div>
                }): action =='whyChooseUs' ?whyChooseUsApi?.map((elem,idx)=>{
                    return <div className='particularStep1' key={idx}>
                    <img src={elem.image} alt="create" className='img9'/>
                    <h4>{elem.title}</h4>
                    <p className='para1'>{elem.description}</p>
                </div>
                }):""}
            </div>
        </div>
    </>
  )
}

export default Working