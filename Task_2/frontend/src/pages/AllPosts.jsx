import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import '../css/AllPosts.css'
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../components/Auth';
const AllPosts = () => {
    const {plan , articles,allBlogs} = useAuth();

    // const [allBlogs, setAllBlogs] = useState(allBlogs)
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredBlogs, setFilteredBlogs] = useState(articles);
    const [searchQuery, setSearchQuery] = useState("");

        // const getAllBlogs = async () => {
        //     try {
        //         const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/getAllBlogs`, {
        //             method: 'GET'
        //         })

        //         const resData = await res.json();

        //         setAllBlogs(resData.allBlogs)

        //     } catch (error) {
        //         console.log(error)
        //     }
        // }

        // useEffect(() => {
        //     getAllBlogs();
        // }, [])

    const categories = [...new Set(allBlogs?.map((blog) => blog.category))];
    // console.log(categories)

  const handleCategoryClick = (category) => {
    const newCategory = category === selectedCategory ? '' : category;
    setSelectedCategory(newCategory);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  useEffect(() => {
    const filtered = articles?.filter((blog) => {

      const matchesCategory = selectedCategory
        ? blog.category === selectedCategory
        : true;

      const matchesSearchQuery =
        blog.title.toLowerCase().includes(searchQuery) ||
        blog.category.toLowerCase().includes(searchQuery) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(searchQuery));

      return matchesCategory && matchesSearchQuery;
    });

    setFilteredBlogs(filtered);
  }, [searchQuery, selectedCategory]); 

  const handlePremPost=()=>{
    try {
        console.log("clicked");
    } catch (error) {
        
    }
  }
        
    return (
        <>
            <Navbar></Navbar>
            <div className='searchPrem'>
                <div className="search-container">
                    <input type="text" placeholder="Search..." className="search-input" onChange={handleSearch} value={searchQuery}/>
                </div>


                <div>
                    <div className="link-container" onClick={handlePremPost}>
                            <svg viewBox="0 0 200 200" width="100" height="100" className="text-lg tracking-widest rotate-svg">
                                <path id="circlePath" fill="none" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                                <text>
                                    <textPath href="#circlePath" startOffset="0%" style={{ fontSize: "17px" }}>
                                        Explore More•
                                    </textPath>
                                    <textPath href="#circlePath" startOffset="29.33%" style={{ fontSize: "17px" }}>
                                        Upgrade yourself•
                                    </textPath>
                                    <textPath href="#circlePath" startOffset="66.66%" style={{ fontSize: "17px" }} className='blinking-text'>
                                        Premium Posts•
                                    </textPath>
                                </text>
                            </svg>
                            <button className="circle-button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50" fill="none" stroke="white" strokeWidth="2">
                                    <line x1="6" y1="18" x2="18" y2="6" />
                                    <polyline points="9 6 18 6 18 15" />
                                </svg>
                            </button>
                    </div>
                </div>

            </div>
            <div className='catBtn'>
                {categories?.map((elem, idx) => {
                    return <button style={{
                        backgroundColor: selectedCategory === elem ? '#007bff' : '#ccc',
                        color: selectedCategory === elem ? '#fff' : '#000',
                        margin: '5px',
                        padding: '5px',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '4px',
                    }} key={idx} onClick={() => handleCategoryClick(elem)}>{elem}</button>
                })}
            </div>
            <div className='imgDiv'>

                <Box sx={{ width: "90vw", height: "100vh", overflowY: 'scroll', marginTop: "20px" }} className="box">
                    <ImageList variant="masonry" cols={3} gap={8} >
                        {filteredBlogs?.length>0 ? filteredBlogs?.map((item, idx) => (
                            <NavLink to={`/completePost/${item._id}`}><ImageListItem key={idx} className="image-item" children={idx}>
                                <div className="image-container">
                                    <img
                                        src={item.image.startsWith('data:image') ? item.image : `${item.image}?w=248&fit=crop&auto=format`}
                                        srcSet={item.image.startsWith('data:image') ? '' : `${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={item.title}
                                        loading="lazy"
                                        className='img5 img7'
                                    />
                                    <div className="overlay">
                                        <div className="text">
                                            <h3>{item.title}</h3>
                                            <div className='hoverDiv'>

                                                <img src={item.authorImage || "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="author_image" className='img4' />
                                                <p>Written by {item.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ImageListItem>
                            </NavLink>
                        )):<h5 className='error' style={{textAlign:"center", width: "90vw" ,overflow:"hidden"}}>No blogs found</h5>}
                    </ImageList>
                </Box>
            </div>
        </>
    )
}

export default AllPosts