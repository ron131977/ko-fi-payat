// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link'; // Correct Link usage
// import movies from '../public/movies.json'; // Path to the JSON file

// const AutoSlider = () => {
//   // Ensure items default to an empty array to avoid undefined errors
//   const [items, setItems] = useState([]); // Store items fetched from movies.json
//   const [activeSlide, setActiveSlide] = useState(0);
//   const slideCount = items.length;

//   // Fisher-Yates Shuffle Function
//   const shuffleArray = (array) => {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]]; // Swap elements
//     }
//     return array;
//   };

//   // Function to move to the next slide
//   const nextSlide = () => {
//     setActiveSlide((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
//   };

//   // Auto-slide effect using setInterval
//   useEffect(() => {
//     // Set items to the fetched movies data
//     const shuffledMovies = shuffleArray([...movies]); // Shuffle movies data
//     setItems(shuffledMovies); // Assigning shuffled movies data to items

//     if (slideCount > 0) {  // Prevent interval if there are no items
//       const slideInterval = setInterval(nextSlide, 5000); // 5 seconds delay

//       // Cleanup interval on unmount
//       return () => clearInterval(slideInterval);
//     }
//   }, [slideCount]); // Only run on mount and when slideCount changes

//   // Determine dynamic route based on the category
//   const getRoute = (item) => {
//     if (item.category === 'movies') return `/movies/${item.id}`;
//     if (item.category === 'tvshow') return `/tvshow/${item.id}`;
//     if (item.category === 'adult') return `/adult/${item.id}`;
//     return '#'; // Fallback for unknown categories
//   };

//   // If no items are available, display a placeholder or return null
//   if (!items || items.length === 0) {
//     return <p>No content available</p>;
//   }

//   return (
//     <div className="slider-container">
//       <h2 className="trending-heading">Top Trending Features</h2>
//       <div className="slides">
//         {items.map((item, index) => (
//           <div key={item.id} className={`slide ${activeSlide === index ? 'active' : ''}`}>
//             <Link href={getRoute(item)} passHref>
//               {/* Image component with dynamic content */}
//               <Image
//                 src={item.image}
//                 alt={item.title}
//                 width={500} // Fixed width
//                 height={750} // Fixed height
//                 quality={90}
//                 priority
//                 style={{ objectFit: 'cover', maxWidth: '100%', height: 'auto' }} // Responsive
//               />
//               <div className="item-details">
//                 <h2>{item.title}</h2>
//               </div>
//             </Link>
//           </div>
//         ))}
//       </div>

//       {/* Styling for carousel responsiveness and CLS prevention */}
//       <style jsx>{`
//         .slider-container {
//           position: relative;
//           width: 100%;
//           max-width: 1200px;
//           margin: 0 auto;
//           overflow: hidden;
//         }

//         .trending-heading {
//           margin-top: 25px; /* Top margin of 25 pixels */
//           font-size: 24px;   /* Adjust font size */
//           color: #333;       /* Text color */
//           text-align: center; /* Center the heading */
//         }

//         .slides {
//           display: flex;
//           transition: transform 1s ease-in-out;
//           transform: translateX(-${activeSlide * 100}%);
//         }

//         .slide {
//           min-width: 100%;
//           display: flex;          // Ensure flexbox is used to center
//           justify-content: center; // Center image horizontally
//           align-items: center;    // Center content vertically
//           position: relative;     // Needed for absolute positioning of details
//         }

//         .slide img {
//           max-width: 100%;  // Make images responsive
//           height: auto;
//         }

//         .item-details {
//           position: absolute;
//           bottom: 10px;
//           left: 50%;
//           transform: translateX(-50%);
//           background: rgba(0, 0, 0, 0.7);
//           padding: 10px;
//           color: white;
//           text-align: center;
//         }

//         @media (max-width: 768px) {
//           .item-details {
//             font-size: 14px;
//           }
//         }

//         @media (max-width: 480px) {
//           .item-details {
//             font-size: 12px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AutoSlider;














// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link'; // Correct Link usage
// import movies from '../public/movies.json'; // Path to the JSON file

// const AutoSlider = () => {
//   // Ensure items default to an empty array to avoid undefined errors
//   const [items, setItems] = useState([]); // Store items fetched from movies.json
//   const [activeSlide, setActiveSlide] = useState(0);
//   const slideCount = items.length;

//   // Fisher-Yates Shuffle Function
//   const shuffleArray = (array) => {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]]; // Swap elements
//     }
//     return array;
//   };

//   // Function to move to the next slide
//   const nextSlide = () => {
//     setActiveSlide((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
//   };

//   // Auto-slide effect using setInterval
//   useEffect(() => {
//     // Set items to the fetched movies data
//     const shuffledMovies = shuffleArray([...movies]); // Shuffle movies data
//     setItems(shuffledMovies); // Assigning shuffled movies data to items

//     if (slideCount > 0) {  // Prevent interval if there are no items
//       const slideInterval = setInterval(nextSlide, 5000); // 5 seconds delay

//       // Cleanup interval on unmount
//       return () => clearInterval(slideInterval);
//     }
//   }, [slideCount]); // Only run on mount and when slideCount changes

//   // If no items are available, display a placeholder or return null
//   if (!items || items.length === 0) {
//     return <p>No content available</p>;
//   }

//   return (
//     <div className="slider-container">
//       <h2 className="trending-heading">Top Trending Features</h2>
//       <div className="slides">
//         {items.map((item, index) => (
//           <div key={item.id} className={`slide ${activeSlide === index ? 'active' : ''}`}>
//             <Link href={`/${item.category === 'movies' ? 'movies' : item.category === 'tvshow' ? 'tvshow' : 'adult'}/${item.id}`}>
//               {/* Image component with dynamic content */}
//               <Image
//                 src={item.image}
//                 alt={item.title}
//                 width={500} // Fixed width
//                 height={750} // Fixed height
//                 quality={90}
//                 priority
//                 style={{ objectFit: 'cover', maxWidth: '100%', height: 'auto' }} // Responsive
//               />
//               <div className="item-details">
//                 <h2>{item.title}</h2>
//               </div>
//             </Link>
//           </div>
//         ))}
//       </div>

//       {/* Styling for carousel responsiveness and CLS prevention */}
//       <style jsx>{`
//         .slider-container {
//           position: relative;
//           width: 100%;
//           max-width: 1200px;
//           margin: 0 auto;
//           overflow: hidden;
//         }

//         .trending-heading {
//           margin-top: 25px; /* Top margin of 25 pixels */
//           font-size: 24px;   /* Adjust font size */
//           color: #333;       /* Text color */
//           text-align: center; /* Center the heading */
//         }

//         .slides {
//           display: flex;
//           transition: transform 1s ease-in-out;
//           transform: translateX(-${activeSlide * 100}%);
//         }

//         .slide {
//           min-width: 100%;
//           display: flex;          // Ensure flexbox is used to center
//           justify-content: center; // Center image horizontally
//           align-items: center;    // Center content vertically
//           position: relative;     // Needed for absolute positioning of details
//         }

//         .slide img {
//           max-width: 100%;  // Make images responsive
//           height: auto;
//         }

//         .item-details {
//           position: absolute;
//           bottom: 10px;
//           left: 50%;
//           transform: translateX(-50%);
//           background: rgba(0, 0, 0, 0.7);
//           padding: 10px;
//           color: white;
//           text-align: center;
//         }

//         @media (max-width: 768px) {
//           .item-details {
//             font-size: 14px;
//           }
//         }

//         @media (max-width: 480px) {
//           .item-details {
//             font-size: 12px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AutoSlider;























import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import movies from '../public/movies.json'; // Path to the JSON file

const AutoSlider = () => {
  const [items, setItems] = useState([]); // Store items fetched from movies.json
  const [activeSlide, setActiveSlide] = useState(0);
  const slideCount = items.length;

  // Fisher-Yates Shuffle Function
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  };

  // Function to move to the next slide
  const nextSlide = () => {
    setActiveSlide((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
  };

  // Auto-slide effect using setInterval
  useEffect(() => {
    const shuffledMovies = shuffleArray([...movies]); // Shuffle movies data
    setItems(shuffledMovies); // Assigning shuffled movies data to items

    if (slideCount > 0) {
      const slideInterval = setInterval(nextSlide, 5000); // 5 seconds delay

      // Cleanup interval on unmount
      return () => clearInterval(slideInterval);
    }
  }, [slideCount]); // Only run on mount and when slideCount changes

  // If no items are available, display a placeholder or return null
  if (!items || items.length === 0) {
    return <p>No content available</p>;
  }

  return (
    <div className="slider-container">
      <h2 className="trending-heading justify-center items-center">Top Trending </h2>
      <div className="slides ">
        {items.map((item, index) => (
          <div key={item.id} className={`slide ${activeSlide === index ? 'active' : ''} `}>
            <Link href={item.siteurl} passHref>
            <div className="image-container animated-border">
              <Image
                src={item.image}
                alt={item.title}
                title={item.title}
                width={500} // Fixed width
                height={750} // Fixed height
                quality={90}
                // priority
                 loading='lazy'
                style={{ objectFit: 'cover', maxWidth: '100%', height: 'auto' }} // Responsive
              />
              <div className="item-details">
                <h2>{item.name}</h2>
              </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Styling for carousel responsiveness and CLS prevention */}
      <style jsx>{`
        .slider-container {
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          overflow: hidden;
        }

        .trending-heading {
          margin-top: 25px; /* Top margin of 25 pixels */
          font-size: 24px;   /* Adjust font size */
          color: #333;       /* Text color */
          text-align: center; /* Center the heading */
        }

        .slides {
          display: flex;
          transition: transform 1s ease-in-out;
          transform: translateX(-${activeSlide * 100}%);
        }

        .slide {
          min-width: 100%;
          display: flex; // Ensure flexbox is used to center
          justify-content: center; // Center image horizontally
          align-items: center; // Center content vertically
          position: relative; // Needed for absolute positioning of details
        }

        .image-container {
          position: relative; // Needed for border and image
          border-radius: 55px; // Rounded corners for the border
          overflow: hidden; // Ensures image fits within the rounded border
        }

        .item-details {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.7);
          padding: 10px;
          color: white;
          text-align: center;
        }

        @media (max-width: 768px) {
          .item-details {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .item-details {
            font-size: 12px;
          }
        }

        /* Animated Border */
        .animated-border {
          position: relative;
          display: inline-block;
          border-radius: 5px; /* Rounded corners for the animated border */
          padding: 5px; /* Creates space for the border */
          background: conic-gradient(from 0deg, #ff4545, #00ff99, #006aff, #ff0095, #ff4545);
          background-size: 300% 300%;
          animation: spin-border 3s linear infinite;
        }

        @keyframes spin-border {
          from {
            background-position: 0%;
          }
          to {
            background-position: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default AutoSlider;



























