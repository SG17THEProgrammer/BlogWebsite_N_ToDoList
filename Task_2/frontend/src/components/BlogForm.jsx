import React, { useEffect, useState } from 'react'
import '../css/BlogForm.css'
// import ReactQuill from 'react-quill';
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';
import Navbar from '../components/Navbar.jsx'
import { RiGeminiFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from './Auth.jsx';
import { ImagetoBase64 } from '../utility/ImagetoBase64.js';
// import Markdown from 'react-markdown'
import { toast } from 'react-toastify';
import Loader from '../components/Loader.jsx'
// import marked from 'marked';
import { Remarkable } from 'remarkable';
import { useLocation, useNavigate, useParams } from 'react-router-dom';



const BlogForm = ({ motive, allBlogs }) => {
  const { user } = useAuth()
  const navigate = useNavigate()



  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullter' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['clean'],
      ['link', 'image']
    ]
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'indent',
    'link', 'image'
  ]

  const [loader, setLoader] = useState(false)
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState([])

  //  console.log(user)


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    story: '',
    description: '',
    authorImage: '',
    tags: [],
    image: '',
    category:''
  });

    const { id } = useParams()
  
    const blogInfo = allBlogs?.filter((elem) => elem._id === id)[0];

    
    const [blogData, setBlogData] = useState(true)

    if (blogInfo && blogData) {
      setTags(blogInfo.tags)
    
      setFormData({
        ...formData,
        title: blogInfo.title,
        story: blogInfo.story,
        description: blogInfo?.description,
        authorImage: blogInfo.authorImage, 
        tags: blogInfo.tags,
        image: blogInfo.image,
        category: blogInfo.category,
      });

      setBlogData(false);
    }
 
  useEffect(() => {
      setFormData({
        name: user.name,
        email: user.email,
        authorImage: user.image || "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      });
  }, [user])

// console.log(formData)
  const handleKeyPress = (e) => {
    const inputValue = newTag.trim();
    if (e.key === 'Enter' && inputValue !== '') {
      e.preventDefault();
      if (!tags.includes(inputValue)) {
        setTags((prevTags) => {
          const updatedTags = [...prevTags, inputValue];
          setFormData({
            ...formData,
            tags: updatedTags,
          });
          return updatedTags;
        });
      }
      setNewTag('');
    }
  };

  const deleteTag = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
    setFormData({
      ...formData,
      tags: updatedTags,
    });
  };

  const generateStory = async () => {
    setLoader(true)
    let dataToSend
    if (formData.title == '') {
      toast.error("Enter title")
      setLoader(false)
      return;
    }
    else if (formData.tags.length == 0) {
      toast.error("Enter atleast one tag")
      setLoader(false)
      return;
    }
    else {
      dataToSend = {
        title: formData?.title,
        tags: formData?.tags,
        purpose: 'forStory'
      };
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/getAnswer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend)
      })

      const answer = await response.json()

      const md = new Remarkable();
      const htmlContent = md.render(answer);

      // console.log(answer);
      setFormData({
        ...formData,
        story: answer
      })

    } catch (error) {
      console.log(error)
    }
    finally {
      setLoader(false)
    }
  }

  const generateDescription = async () => {
    setLoader(true)
    if (formData.title == '') {
      toast.error("Enter title")
      setLoader(false)
      return;
    }
    else if (formData?.tags?.length == 0) {
      toast.error("Enter atleast one tag")
      setLoader(false)
      return;
    }
    else if (formData.story == '') {
      toast.error("Enter story first")
      setLoader(false)
      return;
    }

    const dataToSend = {
      title: formData?.title,
      tags: formData?.tags,
      story: formData?.story,
      purpose: 'forDescription'

    };
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/getAnswer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend)
      })

      const answer = await response.json()
      // const htmlContent = marked(answer);

      const md = new Remarkable();
      const htmlContent = md.render(answer);

      setFormData({
        ...formData,
        description: htmlContent
      })

    } catch (error) {
      console.log(error)
    }
    finally {
      setLoader(false)
    }
  }


  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleQuillChange = (value) => {
    if(value=="<p><br></p>" && blogInfo){
      setFormData({
        ...formData,
        description: blogInfo.description,
      });
    }
    else{
      setFormData({
        ...formData,
        description: value,
      });
    }
  }


  const handleTags = (e) => {
    const inputValue = e.target.value.trim();
    setNewTag(inputValue);
  };

  const handleUploadProfileImage = async (e) => {
    const image = await ImagetoBase64(e.target.files[0])
    setFormData((prev) => {
      return {
        ...prev,
        image: image
      }
    })

  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/createPost`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const resData = await response.json();

      if (response.ok) {

        setFormData({
          ...formData,
          image: '',
          title: '',
          story: '',
        })

        setTags([])

        toast.success(resData.message);

        navigate('/yourPosts')
        window.scrollTo({ top: "0", behavior: "smooth" })

      }
      else {
        toast.error(resData.message[0])
      }


    } catch (error) {
      console.log(error)
    }
  }


  const editPost = async()=>{
    try {
      console.log(formData)

      const dataToSend = {
        title: formData.title,
    story: formData.story,
    description: formData.description,
    authorImage: formData.authorImage,
    tags:formData.tags,
    image: formData.image,
    category:formData.category
      }

      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/editPost`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({postId:id, postData:dataToSend})
      })

      const resData = await res.json()
      if(res.ok){
        toast.success(resData.message)
        navigate('/yourPosts')
        window.location.reload()
      }
      else{
        toast.error(resData.message)
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Navbar></Navbar>
      <div className='postdiv'>
        <h1 className='h1'>{motive=="Create A Post" ?"Create A Post" : "Edit Post"}</h1>
        <label htmlFor="file" className='label' style={{ marginBottom: "10px", textDecoration: "underline", color: "skyblue", cursor: "pointer" }}>Upload an Image</label>

        <img src={formData?.image || "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="blog_image" className='img5' />
        <input type='file' id='file' className='inp1' name='file' accept='image/*' onChange={handleUploadProfileImage} />

        <br />

        <label htmlFor="title" className='label'>Title</label>
        <input type="text" className='inpTxt' placeholder='Enter Title' onChange={handleInput} name='title' value={formData.title} />


        <label htmlFor="category" className='label'>Category</label>
        <select className='inpTxt' onChange={handleInput} name='category' id='category' value={formData.category} required >
          <option value='other'>Choose a category</option>
          <option value="Technology">Technology</option>
          <option value="Health & Fitness">Health & Fitness</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Food & Recipes">Food & Recipes</option>
          <option value="Travel">Travel</option>
          <option value="Fashion">Fashion</option>
          <option value="Finance">Finance</option>
          <option value="Parenting">Parenting</option>
          <option value="Education">Education</option>
          <option value="Work">Work</option>
          <option value="Astronomy">Astronomy</option>
          <option value="Business & Entrepreneurship">Business & Entrepreneurship</option>
        </select>

        <label htmlFor="tags" className='label'>Tags <span className='instruction'>(Press Enter to add a tag)</span></label>
        <input type="text" className='inpTxt' onChange={handleTags}
          value={newTag} name='tags' onKeyDown={handleKeyPress} placeholder='Enter Tags' />

        <div className='tagdiv'>
          {tags?.map((elem, idx) => {
            return <>
              <div className='tags' key={idx}>{elem} &nbsp; <RxCross2 style={{ marginTop: "-1px", cursor: "pointer" }} onClick={() => deleteTag(elem)} /></div>
            </>
          })}
        </div>
        <br /><br />

        <div className='aidiv'>
          <label htmlFor="story" className='label'>Story</label>
          <button className='aibtn' onClick={generateStory}><RiGeminiFill /> Generate using AI</button>
        </div>
        <input type="text" className='inpTxt' placeholder='Write/Generate your Story' onChange={handleInput} name='story' value={formData.story} />

        <br />
        <div className='aidiv'>
          <label htmlFor="description" className='label'>Description</label>
          <button className='aibtn' onClick={generateDescription}><RiGeminiFill /> Generate using AI</button>
        </div>

        <ReactQuill theme="snow" modules={modules} formats={formats} className='reactquill' placeholder='Write/Generate your blog' name='description' onChange={handleQuillChange} value={formData.description} />
        <br></br>

        {motive=="Create A Post" ? <button className='btn2' onClick={handleSubmit}>Create Post</button>:<button className='btn2' onClick={editPost}>Edit Post</button>}


      </div>
      {loader ? <Loader></Loader> : ""}
    </>
  )
}

export default BlogForm