import { useState, useEffect } from "react";
import Link from "next/link";

function AdultSkipAds({ movie }) {
  const [showAd, setShowAd] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [remainingTime, setRemainingTime] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAd(true);
    }, 1000); // Display ad after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosed(true);
  };

  return (
    <div>
      {showAd && !isClosed && (
        <>
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-black bg-opacity-100 transition-opacity"></div>
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div
                  style={{
                    position: "relative",
                    paddingBottom: "56.25%",
                    height: 0,
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      left: "0px",
                      top: "0px",
                      overflow: "hidden",
                    }}
                    frameBorder="0"
                    type="text/html"
                    src="https://geo.dailymotion.com/player/xjrxe.html?video=x8tzf3o"
                    width="100%"
                    height="100%"
                    allowFullScreen
                    title="Dailymotion Video Player"
                    allow="autoplay"
                  ></iframe>
                </div>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-5 text-center sm:mt-0 sm:ml-4 sm:text-Center">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <img
                            src="/18only.png"
                            alt="Logo"
                            className="logo-image"
                          />
                        </div>
                        <div className="mt-5 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <h1
                            className="text-xl font-bold leading-6 text-red-600"
                            id="modal-title"
                          >
                            Are You Sure You Want to Continue?
                          </h1>
                          <div className="mt-2">
                            <p className="text-lg font-bold text-gray-500">
                              This Part of the Website Requires you to be 18
                              years of Age or Older.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex flex flex-col items-center justify-center sm:flex-row-reverse sm:px-6">
                    {remainingTime > 0 && (
                      <div className="text-xl font-bold text-red-600">
                        Connecting To Server in {remainingTime} Sec...
                      </div>
                    )}
                    {remainingTime <= 0 && (
                      <Link href="/">
                        <button
                          onClick={handleClose}
                          type="button"
                          className="inline-flex items-center rounded-3xl my-5 justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xl font-bold text-gray-900 group bg-gradient-to-br from-red-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 scale-100 hover:scale-110 cursor-pointer relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0"
                        >
                          Exit
                        </button>
                      </Link>
                    )}
                    {remainingTime > 0 && (
                      <div className="text-xl font-bold text-red-600"></div>
                    )}
                    {remainingTime <= 0 && (
                      <button
                        onClick={handleClose}
                        type="button"
                        className="inline-flex items-center rounded-3xl my-5 justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xl font-bold text-gray-900 group bg-gradient-to-br from-green-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 scale-100 hover:scale-110 cursor-pointer relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0"
                      >
                        Enter
                      </button>
                    )}
                  </div>
                  <div className="mt-5 text-center sm:mt-0 sm:ml-4 sm:text-center">
                    <div className="mt-2">
                      <p className="text-lg font-bold text-gray-500">
                        Please Verify your age to view this content, or click
                        EXIT to Leave
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdultSkipAds;
