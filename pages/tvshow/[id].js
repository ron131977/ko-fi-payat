import React, { useEffect, useRef, useState } from "react";
import path from "path";
import fs from "fs/promises";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
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
    const filePath = path.join(process.cwd(), "public", "tvshow.json");
    const jsonData = await fs.readFile(filePath, "utf-8");
    const tvshowData = JSON.parse(jsonData);

    // Generate slugs and create paths for each tvshow item
    const paths = tvshowData.map((tvshowItem) => ({
      params: { id: generateSlug(tvshowItem.title) }, // Use the slug as the dynamic route part
    }));

    return {
      paths,
      fallback: false, // Set to false to return 404 if the slug doesn't exist
    };
  } catch (error) {
    console.error("Error reading tvshow.json", error);
    return { paths: [], fallback: false };
  }
}

// Fetching specific tvshow data based on the dynamic slug (id)
export async function getStaticProps({ params }) {
  try {
    const filePath = path.join(process.cwd(), "public", "tvshow.json");
    const jsonData = await fs.readFile(filePath, "utf-8");
    const tvshowData = JSON.parse(jsonData);

    // Find the tvshow item based on the slug in the URL
    const tvshowItem = tvshowData.find(
      (item) => generateSlug(item.title) === params.id
    );

    if (!tvshowItem) {
      return { notFound: true }; // Return 404 if the tvshow item is not found
    }

    return {
      props: {
        tvshowItem, // Pass the tvshow item as a prop to the page
      },
    };
  } catch (error) {
    console.error("Error fetching tvshow item", error);
    return { notFound: true };
  }
}


  
// Dynamic Schema Function
const generateTvshowSchema = (tvshowItem) =>
  JSON.stringify({
    "@context": "http://schema.org/",
    "@type": "Product",
    image: tvshowItem.image,
    name: tvshowItem.name,
    gtin12: tvshowItem.id,
    productID: tvshowItem.id,
    sku: tvshowItem.sku,
    description: tvshowItem.fullDescription,
    brand: {
      "@type": "Brand",
      name: tvshowItem.brand,
    },
    review: {
      "@type": "Review",
      author: {
        "@type": "Thing",
        name: "Staff",
      },
    },
    offers: {
      "@type": "Offer",
      priceCurrency: tvshowItem.priceCurrency,
      price: tvshowItem.price,
      availability: "http://schema.org/InStock",
      availabilityStarts: tvshowItem.availabilityStarts,
      url: `https://buyonlinemovies.vercel.app${tvshowItem.url}`, // Correct URL construction
    },
  });

export default function tvshowArticle({ tvshowItem, videoSources = [] }) {
  const tvshowSchema = generateTvshowSchema(tvshowItem);
  const router = useRouter();

  const [accordionExpanded, setAccordionExpanded] = useState(false); // Added state for the accordion
  const [seconds, setSeconds] = useState(10);
  const [showTimer, setShowTimer] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isCountdownActive, setIsCountdownActive] = useState(false); // For managing the countdown
 
  const playerRef = useRef(null);
  const dailymotionPlayerRef = useRef(null); // Reference for Dailymotion player
  const [playerReady, setPlayerReady] = useState(false);
  const [countdown, setCountdown] = useState(0); // For countdown after 5 minutes
  const [isPreviewEnding, setIsPreviewEnding] = useState(false); // To trigger countdown display
  const { tvshow1, image1, downloadlink, dailytvshow } = tvshowItem || {}; // Ensure `tvshowItem` is defined
  const fullscreenRef = useRef(null);

  // State for current episode and player visibility
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0); // Default to the first episode
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  // Get the current video ID
  const currentVideoId = Array.isArray(tvshow1)
    ? tvshow1[currentEpisodeIndex] || ""
    : "";

  // Construct the video URL
  const currentVideoUrl = `https://short.ink/${currentVideoId}?thumbnail=${image1}`;

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
      // Set a 5-minute timeout after starting the preview
      setTimeout(() => {
        // Start countdown to close preview
        setIsCountdownActive(true);
        let countdownTime = 10; // Countdown time in seconds
        const countdownInterval = setInterval(() => {
          setCountdown(countdownTime);
          countdownTime -= 1;
          if (countdownTime < 0) {
            clearInterval(countdownInterval);
            setIsPlayerVisible(false); // Close the player after countdown
            setIsCountdownActive(false); // Reset countdown state
            setCountdown(0); // Reset countdown value
          }
        }, 1000);
      }, 60000); // 5 minutes in ms (300000ms = 5 minutes)
    }
  };

  // Handle navigating to the next episode
  const handleNextEpisode = () => {
    setCurrentEpisodeIndex((prevIndex) => (prevIndex + 1) % tvshow1.length);
  };

  // Handle navigating to the previous episode
  const handlePreviousEpisode = () => {
    setCurrentEpisodeIndex(
      (prevIndex) => (prevIndex - 1 + tvshow1.length) % tvshow1.length
    );
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

  // Handle navigation back to main tvshow section
  const goBackToMain = () => {
    router.push("/tvshow");
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
      if (tvshowItem.source && tvshowItem.source !== "#") {
        new window.YT.Player("player-0", {
          videoId: tvshowItem.source,
          playerVars: {
            playsinline: 1,
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: tvshowItem.source,
          },
        });
      }

      // Initialize second video player
      if (tvshowItem.source1 && tvshowItem.source1 !== "#") {
        new window.YT.Player("player-1", {
          videoId: tvshowItem.source1,
          playerVars: {
            playsinline: 1,
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: tvshowItem.source1,
          },
        });
      }
    });
  }, [tvshowItem]);

  return (
    <>
      <Head>
        <title>World tvshow 24™ – {tvshowItem.title || "Default Title"}</title>

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
        <meta name="keywords" content={tvshowItem.keywords} />
        <meta
          property="og:description"
          content="Explore the World of Digital Entertainment @ $1.00 USD – Books, Movies, Music, and More!"
        />
        <meta
          name="description"
          content="Explore the World of Digital Entertainment @ $1.00 USD – Books, Movies, Music, and More!"
        />
        <link rel="canonical" href={tvshowItem.siteurl} />
        <meta property="og:locale" content="en_US" />
        {/* <meta property="og:type" content="website" /> */}
        <meta property="og:type" content="tv_show"/>
        <meta
          property="og:title"
          content=" DigitalBay EntertainmentHub™ - Digital Entertainment@ $1.00 USD "
        />
        <meta property="og:url" content={tvshowItem.siteurl} />

        <meta
          property="og:site_name"
          content=" DigitalBay EntertainmentHub™ - Digital Entertainment@ $1.00 USD "
        />
        <meta
          property="og:image"
          content={tvshowItem.image1}
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
          content={tvshowItem.image1}
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: tvshowSchema }}
        />
      </Head>
      <SocialSharing />
      <Script src="../../../propler/ads.js" defer />
      <Script src=".../../../propler/ads2.js" defer />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            window.Aec_ProductPageInfo = {
              "id": "${tvshowItem.id}",
              "sku": "${tvshowItem.sku}",
              "name": "${tvshowItem.name}",
              "image": "${tvshowItem.image}",
              "description": "${tvshowItem.description}",
              "brand": "${tvshowItem.brand}",
              "priceCurrency": "${tvshowItem.priceCurrency}",
              "price": "${tvshowItem.price}",
              "url": "${tvshowItem.siteurl}"
            };
          `,
        }}
      />
      <div style={styles.container}>
        {/* Pagination Button to Return to Main Section */}
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
        <div style={styles.paginationContainer}>
          <button onClick={goBackToMain} style={styles.pageButton}>
            Back to Main TV Show Section
          </button>
        </div>

        <h1 style={styles.title}>{tvshowItem.title}</h1>

        {/* Description Section */}
        {tvshowItem.synopsis && (
          <p style={styles.synopsis}>{tvshowItem.synopsis}</p>
        )}

        {/* Image Section */}
        {tvshowItem.image && (
          <Image
            src={tvshowItem.image}
            alt={tvshowItem.title}
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
        {tvshowItem.source && tvshowItem.source !== "#" && (
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

        {/* Preview button */}
        {!isPlayerVisible && (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <button
              onClick={togglePlayer}
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
                textAlign: "center",
                textShadow: "1px 1px 0px #000",
                fontSize: "20px",
                ...styles.previewButton,
                ...(isHovered ? styles.previewButtonHover : {}),
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
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
            zIndex: 9999, // Ensure it's on top of other content
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Darken background for contrast
            color: "white",
            padding: "20px 40px",
            borderRadius: "5px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          <p>Preview will close in {countdown} seconds...</p>
          <p>Click Download to get the Full Complete HD Quality Tv Show</p>
        </div>
      )}

        {/* Video player */}
        {isPlayerVisible && (
          <div ref={fullscreenRef} style={styles.fullscreenContainer}>
            <div style={styles.navigationContainer}>
              <div style={styles.episodeButtonContainer}>
                <button
                  onClick={handlePreviousEpisode}
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "bold",
                    textAlign: "center",
                    textShadow: "1px 1px 0px #000",
                    fontSize: "20px",
                    ...styles.previewButton,
                    ...(isHovered ? styles.previewButtonHover : {}),
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  disabled={currentEpisodeIndex === 0}
                >
                  Previous Episode
                </button>
                <button
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "bold",
                    textAlign: "center",
                    textShadow: "1px 1px 0px #000",
                    fontSize: "20px",
                    ...styles.backButton, // Spread the styles from styles.backButton
                  }}
                  onClick={togglePlayer}
                >
                  Back
                </button>

                <button
                  onClick={handleNextEpisode}
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "bold",
                    textAlign: "center",
                    textShadow: "1px 1px 0px #000",
                    fontSize: "20px",
                    ...styles.previewButton,
                    ...(isHovered ? styles.previewButtonHover : {}),
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  disabled={currentEpisodeIndex === tvshow1.length - 1}
                >
                  Next Episode
                </button>
              </div>
            </div>
            <iframe
              style={styles.iframe}
              src={currentVideoUrl}
              allowFullScreen
              scrolling="no"
              title={`Episode ${currentEpisodeIndex + 1}`}
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
          Click to Download {tvshowItem?.name}
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

  backButton: {
    padding: "10px 20px",
    backgroundColor: "#FF5733",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    zIndex: 1100,
    fontSize: "16px",
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
  episodeButtonContainer: {
    display: "flex",
    marginTop: "20px",
    alignItems: "center", // Centers vertically
    gap: "10px", // Adds a gap between buttons
  },
  playerButtonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
    flexWrap: "wrap", // Wrap buttons for smaller screens
  },

  playerButton: {
    padding: "10px 20px",
    backgroundColor: "#d6d6d6",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#000",
    cursor: "pointer",
    transition: "all 0.3s",
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

  previewButton: {
    backgroundColor: "#007bff", // Default button color
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  previewButtonHover: {
    backgroundColor: "green", // Green color on hover
  },
  // source: { margin: "20px" },
  // title: { fontSize: "20px", textAlign: "center" },
  youtubePlayer: {
    width: "100%",
    height: "460px",
    filter: "contrast(1.1) saturate(1.2) brightness(1.3) hue-rotate(0deg)",
  },
  dailymotionPlayer: {
    width: "100%",
    height: "460px",
    filter: "contrast(1.1) saturate(1.2) brightness(1.3) hue-rotate(0deg)",
  },
  noVideo: { color: "red", textAlign: "center" },
};
