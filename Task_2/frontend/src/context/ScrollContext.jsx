import React, { createContext, useContext, useRef } from 'react';

// Create a context to share scroll functionality
const ScrollContext = createContext();

// Create a provider component
export const ScrollProvider = ({ children }) => {
  // Create refs for each section to scroll to
  const workingSectionRef = useRef(null);
  const sampleBlogSectionRef = useRef(null);
  const successStoriesSectionRef = useRef(null);
  const whyChooseUsSectionRef = useRef(null);
  const pricingSectionRef = useRef(null);  
  const noRef = useRef(null);  

  // Function to scroll to a specific section
  const scrollTo = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ScrollContext.Provider value={{ scrollTo, workingSectionRef, sampleBlogSectionRef,successStoriesSectionRef , noRef,whyChooseUsSectionRef,pricingSectionRef}}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
