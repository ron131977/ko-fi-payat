// import { useState, useEffect } from 'react';
// import styles from '../styles/videoad.module.css';


// const AdComponent = () => {
//   const [ads, setAds] = useState([]);
//   const [currentAd, setCurrentAd] = useState(null);
//   const [showAd, setShowAd] = useState(true);

//   useEffect(() => {
//     // Fetch ads from ads.json
//     fetch('/ads.json')
//       .then(response => response.json())
//       .then(data => {
//         setAds(data);
//         setCurrentAd(data[0]); // Set the first ad as current
//       })
//       .catch(error => console.error('Error fetching ads:', error));
//   }, []);

//   useEffect(() => {
//     if (currentAd) {
//       // Automatically close the ad after 10 seconds
//       const timer = setTimeout(() => {
//         setShowAd(false);
//       }, 10000);

//       return () => clearTimeout(timer);
//     }
//   }, [currentAd]);

//   const handleClose = () => {
//     setShowAd(false);
//   };

//   if (!showAd || !currentAd) return null;

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.adContainer}>
//         <iframe
//           className={styles.iframe}
//           src={`https://geo.dailymotion.com/player/xkdl0.html?video=${currentAd.videourl}&mute=true&Autoquality=1080p`}
//           frameBorder="0"
//           allowFullScreen
//           title="Advertisement"
//         ></iframe>
//         <div className={styles.text}>{currentAd.text}</div>
//         <button className={styles.closeButton} onClick={handleClose}>Close</button>
//       </div>
//     </div>
//   );
// };

// export default AdComponent;


import { useState, useEffect } from 'react';
import styles from '../styles/videoad.module.css';

const Videoads = () => {
  const [ads, setAds] = useState([]);
  const [currentAd, setCurrentAd] = useState(null);
  const [showAd, setShowAd] = useState(false); // Initially false
  const [countdown, setCountdown] = useState(20); // 10 seconds countdown

  useEffect(() => {
    // Fetch ads from ads.json
    fetch('/ads.json')
      .then(response => response.json())
      .then(data => {
        setAds(data);
        setCurrentAd(data[0]); // Set the first ad as current
      })
      .catch(error => console.error('Error fetching ads:', error));
  }, []);

  useEffect(() => {
    // Show ad after 10 seconds
    const showAdTimer = setTimeout(() => {
      setShowAd(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(showAdTimer);
  }, []);

  useEffect(() => {
    if (currentAd && showAd) {
      // Countdown logic
      const countdownTimer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownTimer);
            setShowAd(false); // Close ad after countdown ends
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownTimer);
    }
  }, [currentAd, showAd]);

  const handleClose = () => {
    setShowAd(false);
  };

  if (!showAd || !currentAd) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.adContainer}>
        <iframe
          className={styles.iframe}
          src={`https://geo.dailymotion.com/player/xkdl0.html?video=${currentAd.videourl}&mute=true&Autoquality=1080p`}
          frameBorder="0"
          allowFullScreen
          title="Advertisement"
        ></iframe>
        <div className={styles.timer}>Closing in {countdown}s</div>
        {/* <button className={styles.closeButton} onClick={handleClose}>Close</button> */}
      </div>
    </div>
  );
};

export default Videoads;
