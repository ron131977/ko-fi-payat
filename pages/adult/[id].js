import React, { useEffect, useRef, useState } from "react";
import path from "path";
import fs from "fs/promises";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import Link from "next/link"; // Ensure you import Link from Next.js
import AdultSkipAds from "../../components/AdultSkipAds";
import SocialSharing from "../../components/SocialSharing";
import GoogleTranslate from "../../components/GoogleTranslate";
// Helper function to create a slug from a title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with dashes
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
}

// This function generates the paths for static generation
export async function getStaticPaths() {
  try {
    const filePath = path.join(process.cwd(), "public", "adult.json");
    const jsonData = await fs.readFile(filePath, "utf-8");
    const adultData = JSON.parse(jsonData);

    // Generate slugs and create paths for each adult item
    const paths = adultData.map((adultItem) => ({
      params: { id: generateSlug(adultItem.title) }, // Use the slug as the dynamic route part
    }));

    return {
      paths,
      fallback: false, // Set to false to return 404 if the slug doesn't exist
    };
  } catch (error) {
    console.error("Error reading adult.json", error);
    return { paths: [], fallback: false };
  }
}

const NewsSchema = (adultItem) =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${adultItem.siteurl}/#website`,
        url: adultItem.siteurl,
        name: "DigitalBay Media Hub™ - Digital Entertainment@ $1.00 USD",
        publisher: {
          "@type": "Organization",
          "@id": "https://digitalbaymediahub.vercel.app/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://digitalbaymediahub.vercel.app/?s={search_term_string}",
          "query-input": "required name=search_term_string",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": `${adultItem.siteurl}/#webpage`,
        url: adultItem.siteurl,
        name: "DigitalBay Media Hub™ - Digital Entertainment@ $1.00 USD",
        isPartOf: {
          "@id": "https://digitalbaymediahub.vercel.app/#website",
        },
        primaryImageOfPage: {
          "@id": "https://digitalbaymediahub.vercel.app/#primaryimage",
        },
        image: {
          "@id": "https://digitalbaymediahub.vercel.app/#primaryimage",
        },
        thumbnailUrl: "https://digitalbaymediahub.vercel.app/og_image.jpg",
        datePublished: adultItem.datePublished,
        dateModified: adultItem.dateModified,
        breadcrumb: {
          "@id": "https://digitalbaymediahub.vercel.app/#breadcrumb",
        },
        inLanguage: "en-US",
        potentialAction: [
          {
            "@type": "ReadAction",
            target: [adultItem.siteurl],
          },
        ],
      },
      {
        "@type": "Article",
        "@id": `${adultItem.siteurl}/#article`,
        url: adultItem.siteurl,
        headline: adultItem.title,
        datePublished: adultItem.datePublished,
        dateModified: adultItem.dateModified,
        author: {
          "@type": "Person",
          "@id": "https://gravatar.com/drtrailer2022",
          name: "Dr Trailer",
          url: "https://gravatar.com/drtrailer2022",
          image: {
            "@type": "ImageObject",
            "@id": "https://gravatar.com/drtrailer2022",
            url: "https://gravatar.com/drtrailer2022",
            caption: "Dr Trailer",
            inLanguage: "en-US",
          },
        },
        publisher: {
          "@type": "Organization",
          "@id": "https://digitalbaymediahub.vercel.app/#organization",
          name: "DigitalBay Media Hub™ - Digital Entertainment@ $1.00 USD",
          url: "https://digitalbaymediahub.vercel.app",
        },
        image: {
          "@id": "https://digitalbaymediahub.vercel.app/#primaryimage",
        },
      },
      {
        "@type": "ImageObject",
        "@id": "https://digitalbaymediahub.vercel.app/#primaryimage",
        url: "https://digitalbaymediahub.vercel.app/og_image.jpg",
        contentUrl: "https://digitalbaymediahub.vercel.app/og_image.jpg",
        width: 1280,
        height: 720,
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://digitalbaymediahub.vercel.app/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://digitalbaymediahub.vercel.app/",
          },
        ],
      },
    ],
  });

// Fetching specific adult data based on the dynamic slug (id)
export async function getStaticProps({ params }) {
  try {
    const filePath = path.join(process.cwd(), "public", "adult.json");
    const jsonData = await fs.readFile(filePath, "utf-8");
    const adultData = JSON.parse(jsonData);

    // Find the adult item based on the slug in the URL
    const adultItem = adultData.find(
      (item) => generateSlug(item.title) === params.id
    );

    if (!adultItem) {
      return { notFound: true }; // Return 404 if the adult item is not found
    }

    return {
      props: {
        adultItem, // Pass the adult item as a prop to the page
      },
    };
  } catch (error) {
    console.error("Error fetching adult item", error);
    return { notFound: true };
  }
}

export default function adultArticle({ adultItem, videoSources = [] }) {
  // const schemaData = NewsSchema(adultItem);
  const schemaData = NewsSchema(adultItem);
  const router = useRouter();
 
   const [accordionExpanded, setAccordionExpanded] = useState(false); // Added state for the accordion
   const [seconds, setSeconds] = useState(10);
   const [showTimer, setShowTimer] = useState(false);
   const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
   const [currentPlayerIndex, setCurrentPlayerIndex] = useState(null); // Selected player index
   const playerRef = useRef(null);
   const dailymotionPlayerRef = useRef(null); // Reference for Dailymotion player
   const [playerReady, setPlayerReady] = useState(false);
   const [isPlayerVisible, setIsPlayerVisible] = useState(false);
   const [isCountdownActive, setIsCountdownActive] = useState(false); 
   const [countdown, setCountdown] = useState(10);
 
   const {  movies2, image1, downloadlink, dailymovies } =
   adultItem || {}; // Ensure `moviesItem` is defined
     const fullscreenRef = useRef(null);
 
  // Video URL for the preview
  const movie1 = adultItem?.movie1 || [];
 
  const urls = [
    `https://short.ink/${Array.isArray(movie1) ? movie1[0] : ""}?thumbnail=${image1}`,
  ];
 
  // Handle toggling the player
  const togglePlayer = () => {
    setIsPlayerVisible((prevState) => !prevState);
    
      // Trigger full-screen mode if opening the player
      if (!isPlayerVisible && fullscreenRef.current) {
       fullscreenRef.current.requestFullscreen?.();
       fullscreenRef.current.webkitRequestFullscreen?.();
       fullscreenRef.current.mozRequestFullScreen?.();
       fullscreenRef.current.msRequestFullscreen?.();
     }
 
     if (!isPlayerVisible) {
       // Set a 1-minute timeout after starting the preview
       setTimeout(() => {
         setIsCountdownActive(true);
         let countdownTime = 10; 
         const countdownInterval = setInterval(() => {
           setCountdown(countdownTime);
           countdownTime -= 1;
           if (countdownTime < 0) {
             clearInterval(countdownInterval);
             setIsPlayerVisible(false); 
             setIsCountdownActive(false); 
             setCountdown(0); 
             setCurrentPlayerIndex(null); // Reset the player index after countdown finishes
           }
         }, 1000);
       }, 60000); 
     }
   };
 
   const handleExitFullscreen = () => {
     setCurrentPlayerIndex(null);
     // Exit full-screen mode
     if (document.fullscreenElement) {
       document.exitFullscreen?.();
       document.webkitExitFullscreen?.();
       document.mozCancelFullScreen?.();
       document.msExitFullscreen?.();
     }
     // Ensure Preview Button is visible again when exiting the player
     setIsPlayerVisible(false);
   };
 
 
   const handleStartTimer = () => {
     setShowTimer(true);
     const timer = setInterval(() => {
       setSeconds((prev) => {
         if (prev === 0) {
           clearInterval(timer);
           return 0;
         }
         return prev - 1;
       });
     }, 1000);
   };
 
  const toggleAccordion = () => {
    setAccordionExpanded(!accordionExpanded); // Toggle the accordion state
  };

  // Handle navigation back to main movies section
  const goBackToMain = () => {
    router.push("/adult");
  };

  useEffect(() => {
    const loadYouTubeAPI = () => {
      return new Promise((resolve) => {
        if (window.YT && window.YT.Player) {
          resolve();
        } else {
          const tag = document.createElement("script");
          tag.src = "https://www.youtube.com/iframe_api";
          tag.onload = () => {
            window.onYouTubeIframeAPIReady = resolve;
          };
          document.body.appendChild(tag);
        }
      });
    };

    loadYouTubeAPI().then(() => {
      // Initialize first video player
      if (adultItem.source && adultItem.source !== "#") {
        new window.YT.Player("player-0", {
          videoId: adultItem.source,
          playerVars: {
            playsinline: 1,
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: adultItem.source,
          },
        });
      }

      // Initialize second video player
      if (adultItem.source1 && adultItem.source1 !== "#") {
        new window.YT.Player("player-1", {
          videoId: adultItem.source1,
          playerVars: {
            playsinline: 1,
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: adultItem.source1,
          },
        });
      }
    });
  }, [adultItem]);

  return (
    <>
      <Head>
        <title>DigitalBay Media Hub™ – {adultItem.title || "Default Title"}</title>

        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href="https://digitalbaymediahub.vercel.app/sitemap.xml"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="googlebot" content="index,follow" />
        <meta name="revisit-after" content="1 days" />
        <meta name="referrer" content="origin" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta
          property="og:keywords"
          content="JustWatch 2024,JustWatch Free, Justwatch US,JustWatch Tv Shows,JustWatch Webseries,JustWatch Movies,JustWatch 2024,Netflix Free,MovieRulz,7MovieRulz 2024,5MovieRulz."
        />
        <meta name="keywords" content={adultItem.keywords} />
        <meta
          property="og:description"
          content="Explore the World of Digital Entertainment @ $1.00 USD – Books, Movies, Music, and More!"
        />
        <meta
          name="description"
          content="Explore the World of Digital Entertainment @ $1.00 USD – Books, Movies, Music, and More!"
        />
        <link rel="canonical" href={adultItem.siteurl} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content=" DigitalBay Media Hub™ - Digital Entertainment@ $1.00 USD "
        />
        <meta property="og:url" content={adultItem.siteurl} />

        <meta
          property="og:site_name"
          content=" DigitalBay Media Hub™ - Digital Entertainment@ $1.00 USD "
        />
        <meta
          property="og:image"
          content={adultItem.image1}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpg" />
        <meta
          name="application-name"
          content=" DigitalBay Media Hub™ - Digital Entertainment@ $1.00 USD "
        />
        <meta
          property="article:modified_time"
          content="2024-01-01T13:13:13+00:00"
        />
        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href="https://digitalbaymediahub.vercel.app/sitemap.xml"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content=" DigitalBay Media Hub™ - Digital Entertainment@ $1.00 USD"
        />
        <meta
          name="twitter:description"
          content="Explore the World of Digital Entertainment @ $1.00 USD – Books, Movies, Music, and More!"
        />
        <meta
          name="twitter:image"
          content={adultItem.image1}
        />
        <meta
          name="google-site-verification"
          content="lV1TQ9qcLQiSO5BLBB4DmztyYJS6QLqDg"
        />

        <meta
          name="facebook-domain-verification"
          content="du918bycikmo1jw78wcl9ih6ziphd7"
        />
        <meta
          name="dailymotion-domain-verification"
          content="dm3bs67ukdegz9qik"
        />
        <meta name="monetag" content="98a412cb5612b9188cd76b9744304b6c" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaData }}
        />
      </Head>
      <SocialSharing />
      <AdultSkipAds />
      <Script src="../../../propler/ads.js" defer />
      <Script src="../../../propler/ads2.js" defer />
      <div style={styles.container}>
      <a
              href="https://t.me/digitalbaymediahub"
              target="_blank"
              rel="noopener noreferrer"
              className="telegram-link"
              style={{
                display: "block",
                textAlign: "center",
                // margin: "0 auto",
                // marginBottom: "20px",
              }}
            >
              <p
                style={{ display: "inline-block",    marginBottom: "20px", }}
                className=" title text-2xl font-bold"
              >
                For Request or Demand <br />
                Movies & TV Series Join Telegram
                <i
                  className="fab fa-telegram telegram-icon"
                  style={{ marginLeft: "8px" }}
                ></i>
              </p>
            </a>
        {/* Pagination Button to Return to Main Section */}
        <div style={styles.paginationContainer}>
          <button onClick={goBackToMain} style={styles.pageButton}>
            Back to Main Adult Section
          </button>
        </div>

        <h1 style={styles.title}>{adultItem.title}</h1>

        {/* Description Section */}
        {adultItem.synopsis && (
          <p style={styles.synopsis}>{adultItem.synopsis}</p>
        )}

        {/* Image Section */}
        {/* {adultItem.image && (
          <img src={adultItem.image} alt={adultItem.title} style={styles.image} />
        )} */}
        {/* Image Section */}
        {adultItem.image && (
          <Image
            src={adultItem.image}
            alt={adultItem.title}
            // style={styles.image}
            width={250} // Adjust the width according to your needs
            height={450} // Adjust the height according to your needs
            quality={90}
            style={{
              //  width: "400px", // Ensures the image is displayed at this width
              //  height: "500px", // Ensures the image is displayed at this height
              //  objectFit: "cover", // Ensures the image covers the dimensions
              margin: "auto",
              borderRadius: "50px", // Rounded corners for the image
              boxShadow: "0 0 10px 0 #000", // Shadow effect
              filter:
                "contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)", // Image filter effects
            }}
          />
        )}
        {/* First YouTube Video */}
        {adultItem.source && adultItem.source !== "#" && (
          <div style={styles.source}>
            <h2
              className="text-3xl mt-2"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
                textAlign: "center",
                textShadow: "1px 1px 0px #000",
                marginTop: "50px",
                marginBottom: "50px",
              }}
            >
              {" "}
              Watch Official Trailer.
            </h2>
            <div id="player-0" style={styles.youtubePlayer}></div>
          </div>
        )}
        {/* Image 1 Section */}
        {/* {adultItem.image1 && <img src={adultItem.image1} alt="Additional" style={styles.image} />} */}

        {/* Second YouTube Video */}
        {/* {adultItem.source1 && adultItem.source1 !== "#" && (
          <div style={styles.source}>
            <div id="player-1" style={styles.youtubePlayer}></div>
          </div>
        )} */}
        {/* second Description */}
        {/* {adultItem.description2 && <p style={styles.description2}>{adultItem.description2}</p>} */}
        {/* Embed MP3 Player and Podcast Indicator */}
        {(adultItem.pod || adultItem.mp3) && (
          <div style={styles.podcastContainer}>
            {/* Podcast Indicator and YouTube Player */}
            {adultItem.pod && (
              <div style={styles.podcastWrapper}>
                <div style={styles.podcastIndicator}>
                  <span
                    role="img"
                    className="animate-pulse"
                    aria-label="Podcast"
                    style={styles.podcastIcon}
                  >
                    🎙️
                  </span>
                  Podcast
                </div>
                <iframe
                  width="50%"
                  height="80"
                  src={`https://www.youtube.com/embed/${new URL(
                    adultItem.pod
                  ).searchParams.get("v")}?list=${new URL(
                    adultItem.pod
                  ).searchParams.get("list")}&controls=1`}
                  frameBorder="0"
                  allow="encrypted-media"
                  allowFullScreen
                  style={styles.youtubeEmbed}
                />
              </div>
            )}

            {/* MP3 Player */}
            {adultItem.mp3 && (
              <div style={styles.audioWrapper}>
                <div style={styles.podcastIndicator}>
                  <span
                    role="img"
                    className="animate-pulse"
                    aria-label="Podcast"
                    style={styles.podcastIcon}
                  >
                    🎙️
                  </span>
                  Podcast
                </div>
                {/* <audio controls style={styles.audioPlayer}>
                <source src={adultItem.mp3} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio> */}
                {/* MP3 Player */}
                <audio controls width="100%" height="50">
                  <source src={adultItem.mp3} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>
        )}

        {/* <div style={styles.iframeContainer}> */}
        {/* <iframe
            style={styles.iframe}
            src={urls[currentPlayerIndex] || ""}
            allowFullScreen
            scrolling="no"
            title="Video Player"
          ></iframe> */}
        {/* <iframe
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      border: "none", // Optional: Remove iframe border
    }}
    src={urls[currentPlayerIndex] || ""}
    allowFullScreen
    scrolling="no"
    title="Video Player"
  ></iframe> */}
        {/* </div> */}

        {/* Player selection buttons */}
        {/* <div style={styles.playerButtonContainer}>
          {urls.map((_, index) => (
            <button
              key={index}
              onClick={() => handlePlayerSelect(index)}
              style={{
                ...styles.playerButton,
                ...(currentPlayerIndex === index
                  ? styles.activePlayerButton
                  : {}),
              }}
            >
              Player {index + 1}
            </button>
          ))}
        </div> */}
      {/* Preview Button */}
   {currentPlayerIndex === null && !isPlayerVisible && (
        <div style={styles.playerButtonContainer}>
          <button
            onClick={() => {
              setCurrentPlayerIndex(0);  // Select the first URL for preview
              togglePlayer(); // Toggle player visibility
            }}
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: "bold",
              textAlign: "center",
              textShadow: "1px 1px 0px #000",
              ...styles.playerButton,
            }}
          >
            Preview
          </button>
        </div>
      )}

      {/* Countdown Popup */}
      {isCountdownActive && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "20px 40px",
            borderRadius: "5px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          <p>Preview will close in {countdown} seconds...</p>
          <p>Click Download to get the Full HD Quality Movie.</p>
        </div>
      )}

      {/* Full-screen video player */}
      {currentPlayerIndex !== null && isPlayerVisible && (
        <div ref={fullscreenRef} style={styles.fullscreenContainer}>
          <button
            onClick={handleExitFullscreen}
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: "bold",
              textAlign: "center",
              textShadow: "1px 1px 0px #000",
              fontSize: "20px",
              ...styles.backButton,
            }}
          >
            Back
          </button>

          <iframe
            style={styles.iframe}
            src={urls[currentPlayerIndex] || ""}
            allowFullScreen
            scrolling="no"
            title={`Player ${currentPlayerIndex + 1}`}
          ></iframe>
        </div>
      )}
    </div>


      {/* Download Section */}
      <div className={styles.container}>
        <h2
          className="px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-3xl hover:text-blue-800 font-bold mt-2"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Click to Download {adultItem?.name}
        </h2>

        <div
          className="flex flex-col items-center justify-center"
          style={{
            marginTop: "50px",
            marginBottom: "50px",
          }}
        >
          {!showTimer ? (
            // Initial Download Now button, starts countdown
            <button
              onClick={handleStartTimer} // Starts countdown
              className="animate-pulse bg-gradient-to-r from-pink-500 to-amber-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300 text-xl mb-4"
              style={{
                marginBottom: "20px",
              }}
            >
              Download Now
            </button>
          ) : (
            <>
              {/* Countdown display after button is clicked */}
              {seconds > 0 ? (
                <p
                  className="bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl font-bold mb-4"
                  style={{ marginTop: "50px" }}
                >
                  Your download link will be ready in {seconds} seconds...
                </p>
              ) : (
                <p
                  className="bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl font-bold mb-4"
                  style={{ marginTop: "50px" }}
                >
                  Your download links are ready.
                </p>
              )}

              {/* Display all the download links after countdown finishes */}
              {seconds === 0 && downloadlink && (
                <div className="flex flex-col items-center w-full">
                  {/* Iterate through the downloadlink array and display each link as a button */}
                  {Array.isArray(downloadlink) && downloadlink.length > 0 ? (
                    downloadlink.map((link, index) => (
                      <Link
                        key={index}
                        href={link}
                        target="_blank"
                        className="bg-gradient-to-r from-amber-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300 mb-4 w-full sm:w-auto"
                      >
                        Download Link
                      </Link>
                    ))
                  ) : (
                    <p className="text-xl font-bold text-red-500">
                      No download links available.
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Poppins', sans-serif",
    color: "var(--text-secondary-color)", // Dynamic secondary text color
  },
  title: {
    fontSize: "2.5rem",
    textAlign: "center",
    marginBottom: "20px",
    color: "#007bff",
    fontWeight: "bold",
    textShadow: "1px 1px 0px #000",
  },
  date: {
    fontSize: "1.3rem",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1.5rem",
    textShadow: "1px 1px 0px #000",
    color: "var(--text-secondary-color)", // Dynamic secondary text color
  },
  courtesy: {
    fontSize: "1.3rem",
    textAlign: "center",
    color: "var(--text-secondary-color)", // Dynamic secondary text color
    marginBottom: "30px",
    fontWeight: "bold",
    textShadow: "1px 1px 0px #000",
  },
  synopsis: {
    fontSize: "1.5rem",
    lineHeight: "1.6",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "var(--text-secondary-color)", // Dynamic secondary text color
  },
  description1: {
    fontSize: "1.3rem",
    lineHeight: "1.6",
    marginBottom: "20px",
    fontWeight: "bold",
    textShadow: "1px 1px 0px #000",
    color: "var(--text-secondary-color)", // Dynamic secondary text color
  },
  description2: {
    fontSize: "1.3rem",
    lineHeight: "1.6",
    marginBottom: "20px",
    fontWeight: "bold",
    textShadow: "1px 1px 0px #000",
    color: "var(--text-secondary-color)", // Dynamic secondary text color
  },
  image: {
    // width: "100%",
    height: "400px",
    maxWidth: "800px",
    margin: "20px auto",
    display: "block",
    borderRadius: "8px",
    boxShadow: "0 0 10px 0 #000",
    filter: "contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)",
  },
  image1: {
    width: "100%",
    maxWidth: "800px",
    margin: "20px auto",
    display: "block",
    borderRadius: "8px",
    boxShadow: "0 0 10px 0 #000",
    filter: "contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)",
  },
  source: {
    marginBottom: "40px",
  },
  youtubePlayer: {
    width: "100%",
    maxWidth: "800px",
    margin: "20px auto",
    display: "block",
    borderRadius: "8px",
    height: "450px",
    boxShadow: "0 0 10px 0 #000",
    filter: "contrast(1.1) saturate(1.2) brightness(1.3) hue-rotate(0deg)",
  },
  podcastContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
  podcastWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "10px",
  },
  podcastIndicator: {
    display: "flex",
    alignItems: "center",
    fontSize: "18px",
    fontWeight: "bold",
    marginRight: "15px",
    marginLeft: "15px",
  },
  podcastIcon: {
    fontSize: "36px",
    marginRight: "8px",
  },
  youtubeEmbed: {
    borderRadius: "5px",
    marginLeft: "10px",
    boxShadow: "0 0 10px 0 #000",
    filter: "contrast(1.1) saturate(1.2) brightness(1.3) hue-rotate(0deg)",
  },
  audioWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "20px",
  },
  iframeContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    aspectRatio: "16/9", // Maintain the 16:9 aspect ratio
    position: "relative",
    backgroundColor: "#000", // Optional: black background for the iframe area
    borderRadius: "8px", // Add a rounded corner effect
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)", // Add a subtle shadow for aesthetics
    overflow: "hidden", // Ensures the iframe doesn't overflow its container
    zIndex: 9999, // Ensure the container is above all elements
  },
  iframe: {
    width: "100%",
    height: "100%",
    border: "none",
    position: "absolute",
    top: 0,
    left: 0,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
    flexWrap: "wrap", // Ensures buttons wrap on smaller screens
  },

  episodeButton: {
    padding: "10px 20px",
    backgroundColor: "#e0e0e0",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#000",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s",
  },

  playerButtonContainer: {
    textAlign: "center",
    marginBottom: "20px",
  },
  playerButton: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
  },
  activePlayerButton: {
    backgroundColor: "#f44336",
    color: "#fff",
  },
  audioPlayer: {
    width: "100%",
    maxWidth: "600px",
    display: "block",
    margin: "0 auto",
  },
  paginationContainer: { marginTop: "30px", textAlign: "center" },
  pageButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    textShadow: "1px 1px 0px #000",
    fontSize: "20px",
    fontWeight: "bold",
  },
  fullscreenContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  iframe: {
    width: "100%",
    height: "100%",
    border: "none",
  },
  backButton: {
    padding: "10px 20px",
    backgroundColor: "#FF5733",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    marginTop:"20px",
    zIndex: 1100,
    alignItems: "center", // Centers vertically
  },
  
   // source: { margin: "20px" },
  // title: { fontSize: "20px", textAlign: "center" },
  youtubePlayer: { width: "100%", height: "460px",  filter: "contrast(1.1) saturate(1.2) brightness(1.3) hue-rotate(0deg)", },
  dailymotionPlayer: { width: "100%", height: "460px",  filter: "contrast(1.1) saturate(1.2) brightness(1.3) hue-rotate(0deg)"},
  noVideo: { color: "red", textAlign: "center" },
};
