import React, { useState, useEffect } from "react";
import path from "path";
import fs from "fs/promises";
import Link from "next/link";
import { useRouter } from "next/router";
import SocialSharing from "../../components/SocialSharing";
import Head from "next/head";
import Script from "next/script";
// Helper function to create a slug from a title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}


export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "public", "tvshow.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const tvshowData = JSON.parse(jsonData);

  // Validate data
  const tvshowArray = Array.isArray(tvshowData) ? tvshowData : [];
  return {
    props: {
      tvshowData: tvshowArray,
    },
  };
}

export default function tvshow({ tvshowData }) {
  const router = useRouter();

  // Handle navigation back to main news section
  const goBackToMain = () => {
    router.push("/");
  };


  const itemsPerPage = 24;
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalPages = Math.ceil((tvshowData?.length || 0) / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currenttvshowItems = tvshowData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getVisiblePages = () => {
    const visiblePages = [];
    const start = Math.max(1, currentPage - 1); // One page before the current
    const end = Math.min(totalPages, currentPage + 1); // One page after the current
    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }
    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  // useEffect(() => {
  //   // Dynamically load the Ko-fi widget script
  //   const kofiScript = document.createElement('script');
  //   kofiScript.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
  //   kofiScript.async = true;

  //   kofiScript.onload = () => {
  //     console.log("Ko-fi widget loaded.");
  //     if (typeof kofiWidgetOverlay !== 'undefined') {
  //       kofiWidgetOverlay.draw('payat', {
  //         'type': 'floating-chat',
  //         'floating-chat.donateButton.text': 'Support me',
  //         'floating-chat.donateButton.background-color': '#00b9fe',
  //         'floating-chat.donateButton.text-color': '#fff'
  //       });
  //     }
  //   };

  //   document.body.appendChild(kofiScript);

  //   return () => {
  //     document.body.removeChild(kofiScript);
  //   };
  // }, []);

  

  const rankMathSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://digitalbaymediahub.vercel.app/#organization",
        name: "DigitalBay Media Hub™ – Tv Show Section.",
        url: "https://digitalbaymediahub.vercel.app/",
      },
      {
        "@type": "WebSite",
        "@id": "https://digitalbaymediahub.vercel.app/tvshow#website",
        url: "https://digitalbaymediahub.vercel.app/tvshow",
        name: "DigitalBay Media Hub™ – Tv Show Section.",
        publisher: {
          "@type": "Organization",
          "@id": "https://digitalbaymediahub.vercel.app/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://digitalbaymediahub.vercel.app/?s={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://digitalbaymediahub.vercel.app/tvshow#webpage",
        url: "https://digitalbaymediahub.vercel.app/tvshow",
        name: "Movies & Tv Shows",
        datePublished: "2024-01-13T13:00:00+00:00",
        dateModified: "2024-01-13T13:13:00+00:00",
        isPartOf: {
          "@id": "https://digitalbaymediahub.vercel.app/#website",
        },
        inLanguage: "en-US",
        mainEntity: [
          {
            "@type": "Article",
            "@id": "https://digitalbaymediahub.vercel.app/tvshow",
            url: "https://digitalbaymediahub.vercel.app/tvshow",
            headline: "DigitalBay Media Hub™",
            datePublished: "2024-01-13T13:00:00+00:00",
            dateModified: "2024-01-13T13:13:00+00:00",
            publisher: {
              "@type": "Organization",
              "@id": "https://digitalbaymediahub.vercel.app/#organization",
              name: "DigitalBay Media Hub™ – Tv Show Section.",
              url: "https://digitalbaymediahub.vercel.app/",
            },
          },
        ],
        sameAs: [
          "https://www.facebook.com/news24channel",
          "https://twitter.com/tvshow24",
          "https://www.youtube.com/@News24thinkfirst",
          "https://www.instagram.com/tvshow24official/",
        ],
      },
    ],
  });

  const soap2daySchema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://digitalbaymediahub.vercel.app/tvshow",
        url: "https://digitalbaymediahub.vercel.app/tvshow",
        name: "DigitalBay Media Hub™ – Tv Show Section",
        isPartOf: { "@id": "https://digitalbaymediahub.vercel.app/#website" },
        about: { "@id": "https://digitalbaymediahub.vercel.app/#organization" },
        primaryImageOfPage: {
          "@id": "https://digitalbaymediahub.vercel.app/#primaryimage",
        },
        image: {
          "@id": "https://digitalbaymediahub.vercel.app/#primaryimage",
        },
        thumbnailUrl: "https://digitalbaymediahub.vercel.app/og_image.jpg",
        datePublished: "2023-07-02T18:30:00+00:00",
        dateModified: "2024-09-24T05:11:20+00:00",
        breadcrumb: {
          "@id": "https://digitalbaymediahub.vercel.app/tvshow#breadcrumb",
        },
        inLanguage: "en-US",
        potentialAction: [
          {
            "@type": "ReadAction",
            target: ["https://digitalbaymediahub.vercel.app/tvshow"],
          },
        ],
      },
      {
        "@type": "ImageObject",
        inLanguage: "en-US",
        "@id": "https://digitalbaymediahub.vercel.app/#primaryimage",
        url: "https://digitalbaymediahub.vercel.app/og_image.jpg",
        contentUrl: "https://digitalbaymediahub.vercel.app/og_image.jpg",
        width: 1280,
        height: 720,
        caption: "DigitalBay Media Hub™ – Tv Show Section",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://digitalbaymediahub.vercel.app/tvshow#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "tvshow",
            item: "https://digitalbaymediahub.vercel.app/tvshow",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://digitalbaymediahub.vercel.app/#website",
        url: "https://digitalbaymediahub.vercel.app/",
        name: "DigitalBay Media Hub™ – Tv Show Section",
        description:
          "",
        publisher: { "@id": "https://digitalbaymediahub.vercel.app/#organization" },
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate:
                "https://digitalbaymediahub.vercel.app/?s={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        ],
        inLanguage: "en-US",
      },
      {
        "@type": "Organization",
        "@id": "https://digitalbaymediahub.vercel.app/#organization",
        name: "DigitalBay Media Hub™ – Tv Show Section",
        url: "https://digitalbaymediahub.vercel.app/",
        logo: {
          "@type": "ImageObject",
          inLanguage: "en-US",
          "@id": "https://digitalbaymediahub.vercel.app/#logo",
          url: "https://digitalbaymediahub.vercel.app/logo.png",
          contentUrl: "https://digitalbaymediahub.vercel.app/logo.png",
          width: 280,
          height: 100,
          caption: "DigitalBay Media Hub™ – Tv Show Section",
        },
        image: {
          "@id": "https://digitalbaymediahub.vercel.app/#logo",
        },
      },
    ],
  });
  return (
    <>
      <Head>
        <title> DigitalBay Media Hub™ – Tv Show Section.</title>

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
          name="keywords"
          content="moviefree, movie free 2024, free movie, free tv shows, watch movie online, free movies online, free movie streaming, movie free streaming, download free"
        />
         <meta
          property="og:keywords"
          content="JustWatch 2024,JustWatch Free, Justwatch US,JustWatch Tv Shows,JustWatch Webseries,JustWatch Movies,JustWatch 2024,Netflix Free,MovieRulz,7MovieRulz 2024,5MovieRulz."
        />
        <meta
          property="og:description"
          content="Explore the World of Digital Entertainment @ $1.00 USD – Books, Movies, Music, and More!"
        />
        <meta
          name="description"
          content="Explore the World of Digital Entertainment @ $1.00 USD – Books, Movies, Music, and More!"
        />
        <link rel="canonical" href="https://digitalbaymediahub.vercel.app/tvshow" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content=" DigitalBay Media Hub™ – Tv Show Section. "
        />
        <meta
          property="og:url"
          content="https://digitalbaymediahub.vercel.app/tvshow"
        />
        <meta
          property="og:site_name"
          content=" DigitalBay Media Hub™ – Tv Show Section. "
        />
        <meta
          property="og:image"
          content="https://digitalbaymediahub.vercel.app/og_image.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpg" />
        <meta
          name="application-name"
          content=" DigitalBay Media Hub™ – Tv Show Section. "
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
          content=" DigitalBay Media Hub™ – Tv Show Section."
        />
        <meta
          name="twitter:description"
          content="Explore the World of Digital Entertainment @ $1.00 USD – Books, Movies, Music, and More!"
        />
        <meta
          name="twitter:image"
          content="https://digitalbaymediahub.vercel.app/og_image.jpg"
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
          dangerouslySetInnerHTML={{ __html: rankMathSchema }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: soap2daySchema }}
        />
      </Head>
      <SocialSharing />
       <Script src="../../../propler/ads.js" defer />
      <Script src="../../../propler/ads2.js" defer />
      <div style={styles.container}>
        {/* Pagination Button to Return to Main Section */}
        <div style={styles.paginationContainer}>
        <button onClick={goBackToMain} style={styles.pageButton}>
          Back to Main Section
        </button>
      </div>
        <h1 style={styles.title}>DigitalBay Media Hub™ Tv Show Section.</h1>
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
        {/* Pagination Controls */}
        <div className="flex items-center justify-center mt-4 gap-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-white text-blue-600 border-gray-300 hover:bg-blue-100"
            }`}
            disabled={currentPage === 1}
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: "bold",
              textAlign: "center",
              textShadow: "1px 1px 0px #000",
              fontSize: "20px",
            }}
          >
            Previous
          </button>

          {/* Visible Page Buttons */}
          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                currentPage === page
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-blue-600 border-gray-300 hover:bg-blue-100"
              }`}
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
                textAlign: "center",
                textShadow: "1px 1px 0px #000",
                fontSize: "20px",
              }}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-white text-blue-600 border-gray-300 hover:bg-blue-100"
            }`}
            disabled={currentPage === totalPages}
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: "bold",
              textAlign: "center",
              textShadow: "1px 1px 0px #000",
              fontSize: "20px",
            }}
          >
            Next
          </button>
        </div>

        {/* Current Page Info */}
        <div
          className="mt-4 text-center text-gray-700 text-xl"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "20px",
            textShadow: "1px 1px 0px #000",
          }}
        >
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
        </div>

        <ul style={styles.newsList}>
          {currenttvshowItems.map((tvshowItem, index) => (
            <li key={index} style={styles.tvshowItem}>
                <Link
                href={`/tvshow/${generateSlug(tvshowItem.title)}`}
                className="no-underline hover:no-underline"
              >
                <div
                  style={styles.card}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <img
                    src={tvshowItem.image1 || tvshowItem.image}
                    alt={tvshowItem.title}
                    // style={{
                    //   height: "200px",
                    //   width: "100%",
                    //   objectFit: "cover",
                    //   boxShadow: "0 0 10px 0 #000",
                    //   filter:
                    //     "contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)",
                    // }}
                    style={{
                      // width: "300px", // Ensures the image is displayed at this width
                      // height: "400px", // Ensures the image is displayed at this height
                      // objectFit: "cover",
                      // margin: "auto",
                      // marginTop: "50px",
                      // marginBottom: "20px",
                      // borderRadius: "50px",
                      boxShadow: "0 0 10px 0 #000",
                      filter:
                        "contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)",
                    }}
                    className="w-full sm:w-32 sm:h-20 object-cover rounded-md mb-4 sm:mb-0"
                  />
                  <div className="flex flex-col sm:text-left text-center">
                    <h2
                      style={styles.cardTitle}
                      className="text-xl font-semibold mb-2"
                    >
                      {tvshowItem.title}
                    </h2>
                    <p
                      style={styles.cardDate}
                      className="text-gray-500 text-sm mb-2"
                    >
                      Upload Date: {tvshowItem.year}
                    </p>
                    <p style={styles.cardDescription} className="text-gray-600">
                      {tvshowItem.synopsis}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Pagination Controls */}
        <div className="flex items-center justify-center mt-4 gap-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-white text-blue-600 border-gray-300 hover:bg-blue-100"
            }`}
            disabled={currentPage === 1}
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: "bold",
              textAlign: "center",
              textShadow: "1px 1px 0px #000",
              fontSize: "20px",
            }}
          >
            Previous
          </button>

          {/* Visible Page Buttons */}
          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                currentPage === page
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-blue-600 border-gray-300 hover:bg-blue-100"
              }`}
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
                textAlign: "center",
                textShadow: "1px 1px 0px #000",
                fontSize: "20px",
              }}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-white text-blue-600 border-gray-300 hover:bg-blue-100"
            }`}
            disabled={currentPage === totalPages}
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: "bold",
              textAlign: "center",
              textShadow: "1px 1px 0px #000",
              fontSize: "20px",
            }}
          >
            Next
          </button>
        </div>

        {/* Current Page Info */}
        <div
          className="mt-4 text-center text-gray-700 text-xl"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "20px",
            textShadow: "1px 1px 0px #000",
          }}
        >
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
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
    marginBottom: "40px",
    color: "#007bff",
  },
  newsList: {
    listStyleType: "none",
    padding: "0",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  tvshowItem: {
    display: "flex",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "1.1rem",
    textShadow: "1px 1px 0px #000",
  },
  card: {
    backgroundColor: "var(--card-bg-color)", // Dynamic card background
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    display: "flex",
    width: "100%",
    maxWidth: "800px",
    transition: "transform 0.3s ease",
  },
  cardImage: {
    width: "200px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  cardContent: {
    padding: "15px",
    flex: 1,
    color: "var(--text-secondary-color)", // Dynamic secondary text color
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "10px",
    fontWeight: "bold",
    textShadow: "1px 1px 0px #000",
    color: "var(--text-secondary-color)", // Dynamic secondary text color
  },
  cardDate: {
    fontSize: "1rem",
    color: "#777",
  },

  paginationContainer: {
    textAlign: "center",
    marginTop: "40px",
  },
  pagination: {
    marginBottom: "20px",
  },
  pageButton: {
    padding: "10px 20px",
    margin: "0 5px",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  activePageButton: {
    backgroundColor: "#0056b3",
  },
  totalPages: {
    fontSize: "1.2rem",
    color: "#333",
    fontWeight: "600",
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
    margin: "0 5px",
    fontWeight: "bold",
  },
};
