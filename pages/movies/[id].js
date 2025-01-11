import React, { useEffect, useRef, useState } from "react";
import path from "path";
import fs from "fs/promises";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from 'next/image';
import Script from "next/script";
import Link from "next/link"; // Ensure you import Link from Next.js
import SocialSharing from "../../components/SocialSharing";
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
    const filePath = path.join(process.cwd(), "public", "movies.json");
    const jsonData = await fs.readFile(filePath, "utf-8");
    const moviesData = JSON.parse(jsonData);

    // Generate slugs and create paths for each movies item
    const paths = moviesData.map((moviesItem) => ({
      params: { id: generateSlug(moviesItem.title) }, // Use the slug as the dynamic route part
    }));

    return {
      paths,
      fallback: false, // Set to false to return 404 if the slug doesn't exist
    };
  } catch (error) {
    console.error("Error reading movies.json", error);
    return { paths: [], fallback: false };
  }
}

// Fetching specific movies data based on the dynamic slug (id)
export async function getStaticProps({ params }) {
  try {
    const filePath = path.join(process.cwd(), "public", "movies.json");
    const jsonData = await fs.readFile(filePath, "utf-8");
    const moviesData = JSON.parse(jsonData);

    // Find the movies item based on the slug in the URL
    const moviesItem = moviesData.find(
      (item) => generateSlug(item.title) === params.id
    );

    if (!moviesItem) {
      return { notFound: true }; // Return 404 if the movies item is not found
    }

    return {
      props: {
        moviesItem, // Pass the movies item as a prop to the page
      },
    };
  } catch (error) {
    console.error("Error fetching movies item", error);
    return { notFound: true };
  }
}

// const moviesSchema = (moviesItem) => 
//   JSON.stringify({
//     "@context": "https://schema.org",
//     "@graph": [
//       {
//         "@type": "WebSite",
//         "@id": `${moviesItem.siteurl}/#website`,
//         url: moviesItem.siteurl,
//         name: "DigitalBay EntertainmentHub™ - Digital Entertainment@ $1.00 USD",
//         publisher: {
//           "@type": "Organization",
//           "@id": "https:/buyonlinemovies.vercel.app/#organization"
//         },
//         potentialAction: {
//           "@type": "SearchAction",
//           target: "https:/buyonlinemovies.vercel.app/?s={search_term_string}",
//           "query-input": "required name=search_term_string"
//         },
//         inLanguage: "en-US"
//       },
//       {
//         "@type": "WebPage",
//         "@id": `${moviesItem.siteurl}/#webpage`,
//         url: moviesItem.siteurl,
//         name: "DigitalBay EntertainmentHub™ - Digital Entertainment@ $1.00 USD",
//         isPartOf: {
//           "@id": "https:/buyonlinemovies.vercel.app/#website"
//         },
//         primaryImageOfPage: {
//           "@id": "https:/buyonlinemovies.vercel.app/#primaryimage"
//         },
//         image: {
//           "@id": "https:/buyonlinemovies.vercel.app/#primaryimage"
//         },
//         thumbnailUrl: "https:/buyonlinemovies.vercel.app/og_image.jpg",
//         datePublished: moviesItem.datePublished,
//         dateModified: moviesItem.dateModified,
//         breadcrumb: {
//           "@id": "https:/buyonlinemovies.vercel.app/#breadcrumb"
//         },
//         inLanguage: "en-US",
//         potentialAction: [
//           {
//             "@type": "ReadAction",
//             target: [moviesItem.siteurl]
//           }
//         ]
//       },
//       {
//         "@type": "Article",
//         "@id": `${moviesItem.siteurl}/#article`,
//         url: moviesItem.siteurl,
//         headline: moviesItem.title,
//         datePublished: moviesItem.datePublished,
//         dateModified: moviesItem.dateModified,
//         author: {
//           "@type": "Person",
//           "@id": "https://gravatar.com/drtrailer2022",
//           name: "Dr Trailer",
//           url: "https://gravatar.com/drtrailer2022",
//           image: {
//             "@type": "ImageObject",
//             "@id": "https://gravatar.com/drtrailer2022",
//             url: "https://gravatar.com/drtrailer2022",
//             caption: "Dr Trailer",
//             inLanguage: "en-US"
//           }
//         },
//         publisher: {
//           "@type": "Organization",
//           "@id": "https:/buyonlinemovies.vercel.app/#organization",
//           name: "DigitalBay EntertainmentHub™ - Digital Entertainment@ $1.00 USD",
//           url: "https:/buyonlinemovies.vercel.app"
//         },
//         image: {
//           "@id": "https:/buyonlinemovies.vercel.app/#primaryimage"
//         }
//       },
//       {
//         "@type": "ImageObject",
//         "@id": "https:/buyonlinemovies.vercel.app/#primaryimage",
//         url: "https:/buyonlinemovies.vercel.app/og_image.jpg",
//         contentUrl: "https:/buyonlinemovies.vercel.app/og_image.jpg",
//         width: 1280,
//         height: 720
//       },
//       {
//         "@type": "BreadcrumbList",
//         "@id": "https:/buyonlinemovies.vercel.app/#breadcrumb",
//         itemListElement: [
//           {
//             "@type": "ListItem",
//             position: 1,
//             name: "Home",
//             item: "https:/buyonlinemovies.vercel.app/"
//           }
//         ]
//       }
//     ]
//   });
  
  export default function MoviesArticle({ moviesItem, videoSources = [] }) {
  // const schemaData = moviesSchema(moviesItem); 
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
    moviesItem || {}; // Ensure `moviesItem` is defined
    const fullscreenRef = useRef(null);

 // Video URL for the preview
 const movie1 = moviesItem?.movie1 || [];

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
    router.push("/movies");
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
      if (moviesItem.source && moviesItem.source !== "#") {
        new window.YT.Player("player-0", {
          videoId: moviesItem.source,
          playerVars: {
            playsinline: 1,
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: moviesItem.source,
          },
        });
      }

      // Initialize second video player
      if (moviesItem.source1 && moviesItem.source1 !== "#") {
        new window.YT.Player("player-1", {
          videoId: moviesItem.source1,
          playerVars: {
            playsinline: 1,
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: moviesItem.source1,
          },
        });
      }
    });
  }, [moviesItem]);


  
  
  return (
    <>
      <Head>
      <title>DigitalBay EntertainmentHub™ – {moviesItem.title || "Default Title"}</title>

        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href="https:/buyonlinemovies.vercel.app/sitemap.xml"
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
          content="DigitalBay EntertainmentHub, movie, movies, video, videos, dvd, dvds, hd-dvd, blu-ray, buy movies, classic movies, comedy movies, horror movies, musicals, action movies, western movies, movie collectors, hard to find movies, movie posters"
        />
         <meta   name="keywords" content={moviesItem.keywords} />
        <meta
          property="og:description"
          content="Explore the World of Digital Entertainment @ $1.00 USD – Books, Movies, Music, and More!"
        />
        <meta
          name="description"
          content="Explore the World of Digital Entertainment @ $1.00 USD – Books, Movies, Music, and More!"
        />
        <link rel="canonical" href={moviesItem.siteurl} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content=" DigitalBay EntertainmentHub™ - Digital Entertainment@ $1.00 USD "
        />
        <meta property="og:url" content={moviesItem.siteurl} />

        <meta
          property="og:site_name"
          content=" DigitalBay EntertainmentHub™ - Digital Entertainment@ $1.00 USD "
        />
        <meta
          property="og:image"
          content={moviesItem.image1}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpg" />
        <meta
          name="application-name"
          content=" DigitalBay EntertainmentHub™ - Digital Entertainment@ $1.00 USD "
        />
        <meta
          property="article:modified_time"
          content="2024-01-01T13:13:13+00:00"
        />
        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href="https:/buyonlinemovies.vercel.app/sitemap.xml"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content=" DigitalBay EntertainmentHub™ - Digital Entertainment@ $1.00 USD"
        />
        <meta
          name="twitter:description"
          content="Explore the World of Digital Entertainment @ $1.00 USD – Books, Movies, Music, and More!"
        />
        <meta
          name="twitter:image"
          content={moviesItem.image1}
        />
        <meta
          name="google-site-verification"
          content="RNN2teFhD-lV1TQ9qcLQiSO5BLBB4DmztyYJS6QLqDg"
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
        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: moviesSchema }}
        /> */}
      </Head>
      <SocialSharing />
      <Script src="../../../propler/ads.js" defer />
      <Script src=".../../../propler/ads2.js" defer />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            window.Aec_ProductPageInfo = {
              "id": "${moviesItem.id}",
              "sku": "${moviesItem.sku}",
              "name": "${moviesItem.name}",
              "image": "${moviesItem.image}",
              "description": "${moviesItem.description}",
              "brand": "${moviesItem.brand}",
              "priceCurrency": "${moviesItem.priceCurrency}",
              "price": "${moviesItem.price}",
              "url": "${moviesItem.url}"
            };
          `,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org/",
            "@type": "Product",
            image: moviesItem.image,
            name: moviesItem.name,
            gtin12: moviesItem.id,
            productID: moviesItem.id,
            sku: moviesItem.sku,
            description: moviesItem.fullDescription,
            brand: moviesItem.brand,
            color: moviesItem.color || "",
            review: {
              "@type": "Review",
              author: "Staff",
              name: "",
            },
            offers: {
              "@type": "Offer",
              priceCurrency: moviesItem.priceCurrency,
              price: moviesItem.price,
              availability: "http://schema.org/InStock",
              availabilityStarts: moviesItem.availabilityStarts,
              availability_date: moviesItem.availabilityDate || "",
              url: moviesItem.url,
            },
          }),
        }}
      />
      <div style={styles.container}>

      <a
              href="https://t.me/ondigitalbay"
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
            Back to Main Movies Section
          </button>
        </div>

        <h1 style={styles.title}>{moviesItem.title}</h1>
      
 {/* Description Section */}
 {moviesItem.synopsis && (
          <p style={styles.synopsis}>{moviesItem.synopsis}</p>
        )}
     
  {/* Image Section */}
  {moviesItem.image && (
          <Image
            src={moviesItem.image}
            alt={moviesItem.title}
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
  {moviesItem.source && moviesItem.source !== "#" && (
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
          Click to Download {moviesItem?.name}
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
