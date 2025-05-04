import React, { useState, useEffect } from 'react';
import './homeAnimation.css'; // Import animation CSS file
import RecentBlogs from '../blog/recentBlogs';


const imagesWithText = [
  { imageUrl: 'pictures/home2.jpeg', text: 'Create a beautiful blog that fits your style. Choose from a selection of easy-to-use templates – all with flexible layouts and hundreds of background images – or design something new.', backgroundColor: 'rgba(33 9 9 / 60%)', animationName: 'scaleIn' },
  { imageUrl: 'pictures/home6.jpeg', text: 'Create a stunning portfolio to showcase your work. Customize your portfolio with different layouts and styles, and easily update your content whenever you need.', backgroundColor: 'rgba(81 80 80 / 80%)', animationName: 'slideDown' },
  { imageUrl: 'pictures/home4.jpeg', text: 'Start an online store with ease. Select from a variety of customizable themes and features, and manage your products and orders effortlessly.', backgroundColor: 'rgb(126 194 182)', animationName: 'slideUp' },
];

export default function Home() {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to change the background image index
  const changeImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesWithText.length);
  };

  // Change image every 5 seconds
  useEffect(() => {
    console.log("home page rendered first")
    const interval = setInterval(changeImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (

    <>
      <div
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Background image container */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${imagesWithText[currentImageIndex].imageUrl})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            opacity: 0.6,
          }}
        />
        {/* Text container with transition */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            color: 'white',
            fontSize: '1.5rem', // Adjust font size for better readability
            textAlign: 'center',
            maxWidth: '45%',
            margin: '0 auto',
            padding: '30px', // Add padding to improve text readability
            backgroundColor: imagesWithText[currentImageIndex].backgroundColor, // Set background color dynamically
            borderRadius: '10px', // Add border radius for better aesthetics
            animation: `${imagesWithText[currentImageIndex].animationName} 1s ease forwards`, // Set animation dynamically
          }}
        >
          <p>{imagesWithText[currentImageIndex].text}</p>
        </div>
      </div>

      <RecentBlogs />

    </>
  );
}
