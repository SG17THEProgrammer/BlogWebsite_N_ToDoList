import React from 'react'
import Navbar from '../components/Navbar'
import Main from './Main'
import Working from './Working'
import Blogs from '../components/Blogs'
import SuccessStories from './SuccessStories'
import '../css/Working.css'
import { useScroll } from '../context/ScrollContext'
import Pricing from './Pricing'

const Home = () => {
const {whyChooseUsSectionRef,workingSectionRef} = useScroll()
  return (
    <>
      <Navbar></Navbar>
      <Main></Main>
      
   <Working action={'howItWorks'} reference={workingSectionRef}></Working>

      <Blogs></Blogs>

      <div style={{marginTop:"180px"}}>

      <Working action={'whyChooseUs'} reference={whyChooseUsSectionRef}></Working>
      </div>

      <Pricing></Pricing>

      <SuccessStories></SuccessStories>
    </>
  )
}

export default Home