import React, { useEffect, useState } from 'react'
import { FaArrowUp } from "react-icons/fa";
import { useAuth } from './Auth';

const GoToTopButton = () => {
    const {smoothScrooling} = useAuth();
    const [showSpecialComponent, setShowSpecialComponent] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // window.scrollY (the number of pixels the document has already been scrolled vertically) and window.innerHeight (the height of the viewport).
            const scrollPosition = window.scrollY + window.innerHeight;
            // total height of the document
            const pageHeight = document.documentElement.scrollHeight;

            const triggerThreshold = pageHeight * 0.2;

            if (scrollPosition > triggerThreshold) {
                setShowSpecialComponent(true);
            }
            else {
                setShowSpecialComponent(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    
  return (
    <>
       <div className={`button1 ${showSpecialComponent ? 'show' : ''}`} onClick={smoothScrooling}>
         <FaArrowUp style={{fontSize:"25px"}} />
        </div>
    </>
  )
}

export default GoToTopButton