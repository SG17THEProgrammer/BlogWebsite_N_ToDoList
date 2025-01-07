import React from 'react'
import Navbar from './Navbar'
import Main from './Main'
import Working from './Working'
import Blogs from './Blogs'
import SuccessStories from './SuccessStories'
import '../css/Working.css'
import { useScroll } from '../context/ScrollContext'

const Home = () => {
const {whyChooseUsSectionRef,workingSectionRef,successStoriesSectionRef} = useScroll()
  return (
    <>
      <Navbar></Navbar>
      <Main></Main>
      
   <Working action={'howItWorks'} reference={workingSectionRef}></Working>

      <Blogs></Blogs>

      <div style={{marginTop:"180px"}}>

      <Working action={'whyChooseUs'} reference={whyChooseUsSectionRef}></Working>
      </div>

    <div ref={successStoriesSectionRef}>

      <SuccessStories></SuccessStories>
    </div>
    </>
  )
}

export default Home