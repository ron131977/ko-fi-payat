import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import SocialSharing from "../components/SocialSharing";
import movies from "../public/movies.json";
import tvshow from "../public/tvshow.json";
import adult from "../public/adult.json";
// import hindiDubbed from "../public/hindiDubbed.json";

// Helper function to create a slug from a title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with dashes
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
}

const uwatchfreeSchema = JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DigitalBay Entertainment Hub™ - Digital Entertainment@ $1.00 USD ",
    url: "https://buyonlinemovies.vercel.app/",
    image: ["https://buyonlinemovies.vercel.app/favicon.ico"],
    logo: {
      "@type": "ImageObject",
      url: "https://buyonlinemovies.vercel.app/logo.png",
      width: 280,
      height: 80,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://buyonlinemovies.vercel.app/",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://buyonlinemovies.vercel.app/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  },
]);

const rankMathSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
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
    {
      "@type": "Organization",
      "@id": "https://buyonlinemovies.vercel.app/#organization",
      name: "DigitalBay Entertainment Hub™ - Digital Entertainment@ $1.00 USD ",
      url: "https://buyonlinemovies.vercel.app",
    },
    {
      "@type": "WebSite",
      "@id": "https://buyonlinemovies.vercel.app/#website",
      url: "https://buyonlinemovies.vercel.app",
      name: "DigitalBay Entertainment Hub™ - Digital Entertainment@ $1.00 USD ",
      publisher: {
        "@type": "Organization",
        "@id": "https://buyonlinemovies.vercel.app/#organization",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://buyonlinemovies.vercel.app/#webpage",
      url: "https://buyonlinemovies.vercel.app/",
      name: "Movie",
      datePublished: "2024-01-13T13:00:00+00:00",
      dateModified: "2024-01-13T13:13:00+00:00",
      about: {
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
      isPartOf: {
        "@id": "https://buyonlinemovies.vercel.app/#website",
      },
      inLanguage: "en-US",
      mainEntity: [
        {
          "@type": "Article",
          "@id": "https://buyonlinemovies.vercel.app/",
          url: "https://buyonlinemovies.vercel.app/",
          headline:
            "DigitalBay Entertainment Hub™ - Digital Entertainment@ $1.00 USD ",
          datePublished: "2024-01-13T13:00:00+00:00",
          dateModified: "2024-01-13T13:13:00+00:00",
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
            "@id": "https://buyonlinemovies.vercel.app/#organization",
            name: "DigitalBay Entertainment Hub™ - Digital Entertainment@ $1.00 USD ",
            url: "https://buyonlinemovies.vercel.app",
          },
        },
        {
          "@type": "Article",
          "@id": "https://buyonlinemovies.vercel.app/",
          url: "https://buyonlinemovies.vercel.app/",
          headline:
            "DigitalBay Entertainment Hub™ - Digital Entertainment@ $1.00 USD ",
          datePublished: "2024-01-13T13:00:00+00:00",
          dateModified: "2024-01-13T13:13:00+00:00",
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
            "@id": "https://buyonlinemovies.vercel.app/#organization",
            name: "DigitalBay Entertainment Hub™ - Digital Entertainment@ $1.00 USD ",
            url: "https://buyonlinemovies.vercel.app",
          },
        },
        {
          "@type": "Article",
          "@id": "https://buyonlinemovies.vercel.app/",
          url: "https://buyonlinemovies.vercel.app/",
          headline:
            "DigitalBay Entertainment Hub™ - Digital Entertainment@ $1.00 USD ",
          datePublished: "2024-01-13T13:00:00+00:00",
          dateModified: "2024-01-13T13:13:00+00:00",
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
        },
      ],
    },
  ],
});

function HomePage({ allData }) {
  const [currentCategory, setCurrentCategory] = useState("movies"); // Default to 'movies'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Automatically display popup after 2 minutes (120000ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupVisible(true);
    }, 10000); // 30 seconds timer

    return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
  }, []);

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getPaginatedItems = () => {
    const categoryItems = allData[currentCategory] || [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    return categoryItems.slice(startIndex, startIndex + itemsPerPage);
  };

  const renderItems = () => {
    const currentItems = getPaginatedItems();
    if (!currentItems.length) {
      return <p className="text-gray-500">No items available.</p>;
    }

    return currentItems.map((item) => (
      <div
        key={item.id}
        className="p-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 flex flex-col items-center"
      >
        <Link href={`/${currentCategory}/${generateSlug(item.title)}`}>
          <Image
            src={item.image}
            alt={item.title || "Item Image"}
            width={400}
            height={300}
            quality={90}
            className="border-2 border-blue-500 object-cover w-full h-48 rounded"
            style={{
              width: "100%",
              height: "auto",
              boxShadow: "0 0 10px 0 #0000FF",
              filter:
                "contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(0deg)",
            }}
          />
        </Link>
        <p className="mt-2 text-sm text-center text-blue-600">
          {item.title || "Untitled"}
        </p>
      </div>
    ));
  };

  const totalPages = Math.ceil(allData[currentCategory]?.length / itemsPerPage);

  return (
    <>
      <Head>
        <title>DigitalBay Entertainment Hub™ - @ $1.00 USD</title>

        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href="https://buyonlinemovies.vercel.app/sitemap.xml"
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
          content="DigitalBay Entertainment Hub, movie, movies, video, videos, dvd, dvds, hd-dvd, blu-ray, buy movies, classic movies, comedy movies, horror movies, musicals, action movies, western movies, movie collectors, hard to find movies, movie posters"
        />
        <meta
          name="keywords"
          content="DigitalBay Entertainment Hub, movie, movies, video, videos, dvd, dvds, hd-dvd, blu-ray, buy movies, classic movies, comedy movies, horror movies, musicals, action movies, western movies, movie collectors, hard to find movies, movie posters"
        />
        <meta
          name="description"
          content="Explore the World of Digital Entertainment @ $1.00 USD – Books, Movies, Music, and More!"
        />
        <link rel="canonical" href="https://buyonlinemovies.vercel.app/" />
        <meta property="og:locale" content="en_US" />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="DigitalBay Entertainment Hub™ - @ $1.00 USD "
        />
        <meta property="og:url" content="https://buyonlinemovies.vercel.app" />
        <meta
          property="og:site_name"
          content="DigitalBay Entertainment Hub™ - @ $1.00 USD "
        />
        <meta
          property="og:image"
          content="https://buyonlinemovies.vercel.app/og_image.jpg"
        />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta property="og:image:type" content="image/jpg" />
        <meta
          name="application-name"
          content="DigitalBay Entertainment Hub™ - @ $1.00 USD "
        />
        <meta
          property="article:modified_time"
          content="2024-01-01T13:13:13+00:00"
        />
        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href="https://buyonlinemovies.vercel.app/sitemap.xml"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Explore the World of Digital Entertainment @ $1.00 USD – Books, Movies, Music, and More!"
        />
        <meta
          name="twitter:description"
          content="Explore the World of Digital Entertainment @ $1.00 USD – Books, Movies, Music, and More!"
        />
        <meta
          name="twitter:image"
          content="https://buyonlinemovies.vercel.app/og_image.jpg"
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
          content="dm0x7o2qx13altq75"
        />
        <meta name="monetag" content="98a412cb5612b9188cd76b9744304b6c" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: rankMathSchema }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: uwatchfreeSchema }}
        />
      </Head>
      <SocialSharing />
      <div className="container mx-auto mt-3 text-center">
        <div className="container">
          <div className="content">
            <h1 className="title">
              DigitalBay Entertainment Hub™ - @ $1.00 USD
            </h1>

            <a
              href="https://t.me/ondigitalbay"
              target="_blank"
              rel="noopener noreferrer"
              className="telegram-link"
              style={{
                display: "block",
                textAlign: "center",
                margin: "0 auto",
                marginTop: "20px",
              }}
            >
              <p
                style={{ display: "inline-block" }}
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
          </div>
        </div>

        {/* Category Navigation */}
        <div
          className="categories flex justify-center space-x-1 mb-6 border-b border-gray-300 text-lg font-bold"
          style={{ textShadow: "1px 1px 0px #000" }}
        >
          {/* flex justify-around border-b border-gray-300 mb-4 font-bold text-2xl */}
          {Object.keys(allData).map((category) => (
            <button
              key={category}
              onClick={() => {
                setCurrentCategory(category);
                setCurrentPage(1); // Reset page on category change
              }}
              className={`px-4 py-2 rounded ${
                currentCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              style={{ textShadow: "1px 1px 0px #000" }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 items-center space-x-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded bg-green-500 text-white disabled:opacity-50 font-bold"
              style={{ textShadow: "1px 1px 0px #000" }}
            >
              Prev
            </button>
            <span
              className="px-4 font-bold"
              style={{ textShadow: "1px 1px 0px #000" }}
            >
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded bg-blue-500 text-white disabled:opacity-50 font-bold"
              style={{ textShadow: "1px 1px 0px #000" }}
            >
              Next
            </button>
          </div>
        )}
        {/* Popup overlay */}
        {isPopupVisible && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                maxWidth: "90%",
                width: "400px",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                animation: "fadeIn 0.3s ease-in-out",
                padding: "20px",
                textAlign: "center", // Ensures all content is center-aligned
                position: "relative", // Important for positioning the close button
              }}
            >
              <h2
                className="animate-pulse"
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "red",
                  margin: "0 0 10px", // Adds space below the heading
                }}
              >
                Alert Message !!!
              </h2>
              <button
                onClick={closePopup}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "#333",
                  position: "absolute", // Ensure it's positioned correctly
                  top: "10px",
                  right: "10px", // Places the button in the top-right corner
                }}
              >
                ×
              </button>
              <p
                style={{
                  color: "#0052cc",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {" "}
                In Order to Work this out you must{" "}
              </p>
              <p
                style={{
                  color: "#0052cc",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {" "}
                Request or Demand for
                <br />
                Movies & TV Series by connecting to  <a
              href="https://t.me/ondigitalbay"
              target="_blank"
              rel="noopener noreferrer"
              className="telegram-link animate-pulse"
              style={{
                display: "block",
                textAlign: "center",
                color: "#FF0000",
                textDecoration: "none", // Remove underline
               
              }}
            >
                Telegram Channel.
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Item  s Grid */}
        <div className="flex flex-wrap justify-center mt-4 text-bg font-extrabold">
          {renderItems()}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 items-center space-x-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded bg-green-500 text-white disabled:opacity-50 font-bold"
              style={{ textShadow: "1px 1px 0px #000" }}
            >
              Prev
            </button>
            <span
              className="px-4 font-bold"
              style={{ textShadow: "1px 1px 0px #000" }}
            >
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded bg-blue-500 text-white disabled:opacity-50 font-bold"
              style={{ textShadow: "1px 1px 0px #000" }}
            >
              Next
            </button>
          </div>
        )}
        <style jsx>{`
          .title {
            font-size: 1.25rem;
            font-weight: 900;
            margin-bottom: 1rem;
            text-transform: uppercase;
            text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);
          }

          .telegram-icon {
            color: #0088cc;
            margin-left: 10px;
            font-size: 2rem;
            animation: pulse 1.5s infinite;
          }

          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }

          @media (min-width: 768px) {
            .title {
              font-size: 1rem;
            }
          }

          @media (min-width: 1024px) {
            .title {
              font-size: 1.5rem;
            }
          }
        `}</style>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const sanitizeData = (data) =>
    data
      .filter((item) => item.title && item.image) // Ensure valid entries
      .map((item) => ({
        id: item.id || item.title, // Use title or id as a fallback for uniqueness
        image: item.image,
        title: item.title,
      }));

  const allData = {
    movies: sanitizeData(movies),
    tvshow: sanitizeData(tvshow),
    adult: sanitizeData(adult),
    // hindiDubbed: sanitizeData(hindiDubbed),
  };

  return {
    props: {
      allData,
    },
  };
}

export default HomePage;
